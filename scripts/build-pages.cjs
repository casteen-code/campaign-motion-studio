// Stage only the editor's public entrypoints for this repository's Pages site.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
execFileSync(process.execPath, [path.join(__dirname, 'build.cjs')], {
  cwd: root,
  stdio: 'inherit'
});

fs.rmSync(output, { recursive: true, force: true });
for (const entry of ['index.html', 'examples/realme-99-legacy.html']) {
  const target = path.join(output, entry);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, entry), target);
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log('Pages package ready: _site/index.html and the original editor.');
