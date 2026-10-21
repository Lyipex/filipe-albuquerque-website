import { handleContactRequest } from "@/lib/server/contact-runtime";

export const runtime = "nodejs";
export const maxDuration = 30;

export const POST = handleContactRequest;
