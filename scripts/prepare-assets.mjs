import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('public/images', { recursive: true });
const earth = await fetch('https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_2048.jpg');
if (!earth.ok) throw new Error('NASA texture download failed');
const earthBytes = Buffer.from(await earth.arrayBuffer());
await writeFile('public/images/earth.jpg', earthBytes);
// Reproject the equirectangular NASA texture to Web Mercator for Leaflet.
const { data, info } = await sharp(earthBytes).resize(2048, 1024).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const mercator = Buffer.alloc(2048 * 2048 * info.channels);
for (let y = 0; y < 2048; y++) {
  const latitude = Math.atan(Math.sinh(Math.PI * (1 - 2 * (y + .5) / 2048)));
  const sourceRow = Math.max(0, Math.min(1023, Math.floor((.5 - latitude / Math.PI) * 1024)));
  const rowSize = 2048 * info.channels;
  data.copy(mercator, y * rowSize, sourceRow * rowSize, (sourceRow + 1) * rowSize);
}
await sharp(mercator, { raw: { width: 2048, height: 2048, channels: info.channels } }).jpeg({ quality: 88 }).toFile('public/images/earth-mercator.jpg');
const tiles = await Promise.all(Array.from({ length: 25 }, async (_, index) => {
  const x = 94 + index % 5; const y = 53 + Math.floor(index / 5);
  const response = await fetch(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/7/${y}/${x}`);
  if (!response.ok) throw new Error(`Satellite tile ${x}/${y} failed`);
  return { input: Buffer.from(await response.arrayBuffer()), left: (index % 5) * 256, top: Math.floor(index / 5) * 256 };
}));
await sharp({ create: { width: 1280, height: 1280, channels: 3, background: '#112b28' } }).composite(tiles).jpeg({ quality: 92 }).toFile('public/images/bangladesh.jpg');
console.log('Saved NASA Earth texture and static Bangladesh satellite mosaic.');
