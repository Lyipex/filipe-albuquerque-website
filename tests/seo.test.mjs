import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

// Each process evaluates the real build-time configuration in an isolated context.
for (const [mode, context, index] of [
  ['production', 'production', true],
  ['production', 'deploy-preview', false],
  ['production', 'branch-deploy', false],
  ['development', 'dev', false],
  ['production', '', true],
]) {
  test(`SEO: ${mode}/${context || 'Node local'} mantém metadados e cabeçalhos consistentes`, () => {
    const result = spawnSync(process.execPath, ['--import', './tests/register-typescript.mjs', '--input-type=module', '-e', `
      import assert from 'node:assert/strict';
      import config from './next.config.ts';
      import { pageMetadata } from './src/lib/seo.ts';
      const title = 'Filipe Albuquerque | Sites e Soluções Digitais';
      const description = 'Descrição preservada';
      const metadata = pageMetadata(title, description, '/');
      assert.equal(metadata.metadataBase.href, 'https://filipealbuquerque.netlify.app/');
      assert.equal(metadata.alternates.canonical, 'https://filipealbuquerque.netlify.app/');
      assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
      assert.equal(metadata.title, title);
      assert.equal(metadata.openGraph.title, title);
      assert.equal(metadata.openGraph.siteName, title);
      assert.equal(metadata.twitter.title, title);
      assert.equal(metadata.description, description);
      assert.equal(metadata.openGraph.description, description);
      assert.equal(metadata.twitter.description, description);
      assert.deepEqual(metadata.robots, { index: ${index}, follow: ${index} });
      const headers = await config.headers();
      assert.equal(headers[0].headers.find(h => h.key === 'X-Robots-Tag').value, '${index ? 'index, follow' : 'noindex, nofollow'}');
    `], { encoding: 'utf8', env: { ...process.env, NODE_ENV: mode, CONTEXT: context } });
    assert.equal(result.status, 0, result.stderr);
  });
}
