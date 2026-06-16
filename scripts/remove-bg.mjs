// scripts/remove-bg.mjs
// Removes white/near-white backgrounds from coat of arms images using flood-fill from edges.
// Saves results as PNGs in the same directory.

import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIR = new URL('../public/images/%D0%93%D0%B5%D1%80%D0%B1%D1%8B/', import.meta.url).pathname
  .replace(/^\/([A-Z]:)/, '$1')
  .split('/').map(decodeURIComponent).join('/');

// Tolerance: how close to white a pixel must be to be considered background.
// 0 = exact white only, 255 = everything. 30 handles slight JPG compression artifacts.
const TOLERANCE = 30;

function isWhite(r, g, b) {
  return r >= 255 - TOLERANCE && g >= 255 - TOLERANCE && b >= 255 - TOLERANCE;
}

async function removeBg(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info; // channels = 4 (RGBA)
  const visited = new Uint8Array(width * height);
  const queue = [];

  const idx = (x, y) => (y * width + x) * channels;
  const pixIdx = (x, y) => y * width + x;

  // Seed the queue with all edge pixels that look white
  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      const i = idx(x, y);
      if (!visited[pixIdx(x, y)] && isWhite(data[i], data[i+1], data[i+2])) {
        visited[pixIdx(x, y)] = 1;
        queue.push([x, y]);
      }
    }
  }
  for (let y = 1; y < height - 1; y++) {
    for (const x of [0, width - 1]) {
      const i = idx(x, y);
      if (!visited[pixIdx(x, y)] && isWhite(data[i], data[i+1], data[i+2])) {
        visited[pixIdx(x, y)] = 1;
        queue.push([x, y]);
      }
    }
  }

  // BFS flood fill
  const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    // Make transparent
    const i = idx(cx, cy);
    data[i+3] = 0;

    for (const [dx, dy] of dirs) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      if (visited[pixIdx(nx, ny)]) continue;
      const ni = idx(nx, ny);
      if (isWhite(data[ni], data[ni+1], data[ni+2])) {
        visited[pixIdx(nx, ny)] = 1;
        queue.push([nx, ny]);
      }
    }
  }

  const outPath = filePath.replace(/\.(gif|jpg|jpeg|png)$/i, '.png');
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  return outPath;
}

const files = (await readdir(DIR))
  .filter(f => /\.(gif|jpg|jpeg|png)$/i.test(f));

console.log(`Processing ${files.length} files in ${DIR}\n`);

for (const file of files) {
  const filePath = join(DIR, file);
  try {
    const out = await removeBg(filePath);
    const same = out === filePath;
    console.log(`  ✓ ${file}${same ? '' : ' → ' + basename(out)}`);
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

console.log('\nDone.');