const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// A vibrant, high-contrast blooming flower designed specifically to pop at 16px-64px in browser tabs (both dark & light modes)
const flowerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <defs>
    <radialGradient id="flowerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff5eb" />
      <stop offset="40%" stop-color="#fed7aa" />
      <stop offset="100%" stop-color="#ea580c" />
    </radialGradient>
    <linearGradient id="rosePink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe4e6" />
      <stop offset="30%" stop-color="#fb7185" />
      <stop offset="70%" stop-color="#e11d48" />
      <stop offset="100%" stop-color="#9f1239" />
    </linearGradient>
    <linearGradient id="warmGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="60%" stop-color="#16a34a" />
      <stop offset="100%" stop-color="#14532d" />
    </linearGradient>
    <filter id="popShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Emerald Leaves Behind Flower -->
  <path d="M28 92C14 78 18 56 38 52C42 66 38 82 28 92Z" fill="url(#leafGreen)" stroke="#14532d" stroke-width="2" />
  <path d="M100 92C114 78 110 56 90 52C86 66 90 82 100 92Z" fill="url(#leafGreen)" stroke="#14532d" stroke-width="2" />
  <path d="M64 116C50 110 50 90 64 88C78 90 78 110 64 116Z" fill="url(#leafGreen)" />

  <!-- Outer Golden Petals (Ring 1) -->
  <g filter="url(#popShadow)">
    <circle cx="64" cy="34" r="22" fill="url(#warmGold)" />
    <circle cx="64" cy="94" r="22" fill="url(#warmGold)" />
    <circle cx="34" cy="64" r="22" fill="url(#warmGold)" />
    <circle cx="94" cy="64" r="22" fill="url(#warmGold)" />
  </g>

  <!-- Diagonal Rose Blossom Petals (Ring 2) -->
  <g filter="url(#popShadow)">
    <circle cx="42" cy="42" r="20" fill="url(#rosePink)" />
    <circle cx="86" cy="42" r="20" fill="url(#rosePink)" />
    <circle cx="42" cy="86" r="20" fill="url(#rosePink)" />
    <circle cx="86" cy="86" r="20" fill="url(#rosePink)" />
  </g>

  <!-- Inner Rose Core -->
  <circle cx="64" cy="64" r="26" fill="url(#rosePink)" stroke="#fed7aa" stroke-width="2.5" />
  
  <!-- Swirling Center Rosebuds -->
  <path d="M58 52C68 50 78 58 74 68C70 78 56 76 54 66C54 60 58 52 58 52Z" fill="#ffe4e6" opacity="0.9" />
  <circle cx="64" cy="64" r="10" fill="url(#warmGold)" />
  <circle cx="64" cy="64" r="5" fill="#ffffff" />
</svg>`;

// Helper function to build a valid Windows ICO buffer containing multiple PNG images
function createIco(pngBuffers) {
  // pngBuffers: Array of { width: number, height: number, buffer: Buffer }
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  
  let currentOffset = headerSize;
  const dirEntries = [];

  for (const item of pngBuffers) {
    const size = item.buffer.length;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0); // width
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(size, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // image offset
    dirEntries.push(entry);
    currentOffset += size;
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count of images

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
}

async function run() {
  const root = path.resolve(__dirname, '..');
  const svgBuf = Buffer.from(flowerSvg, 'utf-8');

  // Save SVG
  fs.writeFileSync(path.join(root, 'src', 'app', 'icon.svg'), flowerSvg);
  fs.writeFileSync(path.join(root, 'public', 'icon.svg'), flowerSvg);

  // Generate PNG sizes
  const size16 = await sharp(svgBuf).resize(16, 16).png().toBuffer();
  const size32 = await sharp(svgBuf).resize(32, 32).png().toBuffer();
  const size48 = await sharp(svgBuf).resize(48, 48).png().toBuffer();
  const size64 = await sharp(svgBuf).resize(64, 64).png().toBuffer();
  const size180 = await sharp(svgBuf).resize(180, 180).png().toBuffer();
  const size192 = await sharp(svgBuf).resize(192, 192).png().toBuffer();

  // Create valid ICO file containing 16, 32, and 48px
  const icoBuf = createIco([
    { width: 16, height: 16, buffer: size16 },
    { width: 32, height: 32, buffer: size32 },
    { width: 48, height: 48, buffer: size48 }
  ]);

  // Write ICO files (both in app and public)
  fs.writeFileSync(path.join(root, 'src', 'app', 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), icoBuf);

  // Write PNG files
  fs.writeFileSync(path.join(root, 'public', 'icon.png'), size64);
  fs.writeFileSync(path.join(root, 'public', 'apple-icon.png'), size180);
  fs.writeFileSync(path.join(root, 'src', 'app', 'apple-icon.png'), size180);

  // Delete vercel.svg if exists to prevent any confusion
  const vercelPath = path.join(root, 'public', 'vercel.svg');
  if (fs.existsSync(vercelPath)) {
    fs.unlinkSync(vercelPath);
  }

  console.log('SUCCESS: Flower icons and favicon.ico generated cleanly!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
