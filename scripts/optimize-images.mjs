// Otimização one-time das imagens em /public.
// Reduz dimensões exageradas e recomprime, mantendo nome e formato
// (zero mudança de código). Tudo está no git, então é reversível.
//
// Uso: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = "public";

// Regras por pasta: largura máxima e qualidade.
const RULES = [
  { dir: "public/images",         maxW: 1600, q: 80 }, // hero / CTA / galeria
  { dir: "public/speakers",       maxW: 700,  q: 80 }, // fotos em coluna pequena
  { dir: "public/logos",          maxW: 480,  q: 90 }, // logos CITEC/Afya (exibidos pequenos)
  { dir: "public/logos/sponsors", maxW: 440,  q: 90 }, // logos de patrocinadores
];

function ruleFor(path) {
  // pega a regra mais específica (caminho mais longo) que casa
  return RULES
    .filter((r) => path.replaceAll("\\", "/").startsWith(r.dir + "/"))
    .sort((a, b) => b.dir.length - a.dir.length)[0];
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const fmt = (n) => (n / 1024).toFixed(0) + "KB";
let before = 0, after = 0, count = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const rule = ruleFor(file);
  if (!rule) continue;

  const input = await readFile(file); // lê tudo primeiro (evita lock no Windows)
  const sizeBefore = input.length;
  const img = sharp(input, { failOn: "none" });
  const meta = await img.metadata();

  let pipeline = img.rotate(); // respeita orientação EXIF
  if (meta.width && meta.width > rule.maxW) {
    pipeline = pipeline.resize({ width: rule.maxW, withoutEnlargement: true });
  }
  pipeline =
    ext === ".png"
      ? pipeline.png({ compressionLevel: 9, palette: true, quality: rule.q })
      : pipeline.jpeg({ quality: rule.q, mozjpeg: true });

  const buf = await pipeline.toBuffer();
  // só sobrescreve se realmente ficou menor
  if (buf.length < sizeBefore) {
    await writeFile(file, buf);
    const saved = sizeBefore - buf.length;
    before += sizeBefore; after += buf.length; count++;
    console.log(`${file.replace(ROOT + "/", "")}  ${fmt(sizeBefore)} -> ${fmt(buf.length)}  (-${fmt(saved)})`);
  }
}

console.log("\n=================================");
console.log(`Arquivos otimizados: ${count}`);
console.log(`Total: ${fmt(before)} -> ${fmt(after)}  (economia ${fmt(before - after)}, ${((1 - after / before) * 100).toFixed(0)}%)`);
