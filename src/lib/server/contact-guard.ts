import "server-only";

// One atomic reservation across all Vercel instances. No form fields or raw IPs are stored.
export const reserveScript = `
local previous = redis.call('GET', KEYS[1])
local now = tonumber(ARGV[1])
local token = ARGV[2]
if previous then
  local entry = cjson.decode(previous)
  token = entry.token
  if entry.status == 'accepted' then return {'accepted', 0, token} end
  if entry.lockUntil > now then return {'busy', math.ceil((entry.lockUntil - now) / 1000), token} end
end
local ipCount = redis.call('INCR', KEYS[2])
if ipCount == 1 then redis.call('EXPIRE', KEYS[2], 600) end
local contactCount = redis.call('INCR', KEYS[3])
if contactCount == 1 then redis.call('EXPIRE', KEYS[3], 600) end
if ipCount > 5 or contactCount > 3 then return {'limited', math.max(redis.call('TTL', KEYS[2]), redis.call('TTL', KEYS[3])), token} end
local entry = cjson.encode({status='pending', token=token, lockUntil=now + 60000})
if previous then redis.call('SET', KEYS[1], entry, 'KEEPTTL')
else redis.call('SET', KEYS[1], entry, 'EX', 86400) end
return {'reserved', 0, token}
`;

export const finishScript = `
local previous = redis.call('GET', KEYS[1])
if not previous then return 0 end
local entry = cjson.decode(previous)
if entry.token ~= ARGV[1] then return 0 end
entry.status = ARGV[2]
entry.lockUntil = 0
redis.call('SET', KEYS[1], cjson.encode(entry), 'KEEPTTL')
return 1
`;

export type Reservation = { status: "reserved" | "busy" | "limited" | "accepted"; retryAfter: number; token: string };
export type ContactGuard = {
  reserve: (fingerprint: string, ip: string, contact: string) => Promise<Reservation>;
  finish: (fingerprint: string, token: string, status: "accepted" | "retry") => Promise<void>;
};

export function redisContactGuard(url: string, token: string): ContactGuard {
  async function command(args: (string | number)[]) {
    const response = await fetch(url, {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args), signal: AbortSignal.timeout(4000), cache: "no-store",
    });
    if (!response.ok) throw new Error("guard_unavailable");
    const data = await response.json();
    if (data.error || !("result" in data)) throw new Error("guard_unavailable");
    return data.result;
  }
  return {
    async reserve(fingerprint, ip, contact) {
      const result = await command(["EVAL", reserveScript, 3, `quote:payload:${fingerprint}`, `quote:ip:${ip}`, `quote:contact:${contact}`, Date.now(), crypto.randomUUID()]);
      if (!Array.isArray(result) || !["reserved", "busy", "limited", "accepted"].includes(result[0]) || typeof result[2] !== "string") throw new Error("guard_unavailable");
      return { status: result[0], retryAfter: Math.max(1, Number(result[1]) || 1), token: result[2] };
    },
    async finish(fingerprint, requestToken, status) {
      await command(["EVAL", finishScript, 1, `quote:payload:${fingerprint}`, requestToken, status]);
    },
  };
}
