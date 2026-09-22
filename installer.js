// Instalador do PipSearch (pequeno). Uso: node installer.js
// Lê os arquivos d01.txt, d02.txt, ... (nesta mesma pasta), junta o conteúdo e recria o projeto em ./pipsearch
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const parts = fs.readdirSync(__dirname).filter(f => /^d\d+\.txt$/.test(f)).sort();
if (!parts.length) { console.error('Nenhum arquivo d01.txt, d02.txt... encontrado nesta pasta.'); process.exit(1); }
const b64 = parts.map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('').replace(/\s+/g, '');
const files = JSON.parse(zlib.gunzipSync(Buffer.from(b64, 'base64')).toString('utf8'));
const dest = path.join(process.cwd(), 'pipsearch');
for (const [p, c] of Object.entries(files)) {
  const f = path.join(dest, p); if (!f.startsWith(dest + path.sep)) continue;
  fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, c);
}
console.log(`Pronto: ${Object.keys(files).length} arquivos em ${dest}`);
