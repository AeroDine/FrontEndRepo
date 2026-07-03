import fs from "fs";
import path from "path";

const files = {
  customer:
    "C:/Users/ranbu/Downloads/FoodTrump-Customer UX-030726-141416.pdf",
  merchant:
    "C:/Users/ranbu/Downloads/FoodTrump-Merchant Onboarding and E2E-030726-141339.pdf",
};

const outRoot = path.resolve("design-refs/pdf-images");
fs.mkdirSync(outRoot, { recursive: true });

function extractJpegs(buffer, prefix) {
  const out = [];
  // JPEG SOI marker
  const SOI = Buffer.from([0xff, 0xd8, 0xff]);
  let offset = 0;
  let idx = 0;
  while (offset < buffer.length) {
    const start = buffer.indexOf(SOI, offset);
    if (start === -1) break;
    // JPEG EOI marker
    let end = buffer.indexOf(Buffer.from([0xff, 0xd9]), start + 3);
    if (end === -1) break;
    end += 2;
    const slice = buffer.subarray(start, end);
    if (slice.length > 10000) {
      const file = path.join(outRoot, `${prefix}-${idx++}.jpg`);
      fs.writeFileSync(file, slice);
      out.push({ file, size: slice.length });
    }
    offset = end;
  }
  return out;
}

for (const [name, file] of Object.entries(files)) {
  const buf = fs.readFileSync(file);
  const images = extractJpegs(buf, name);
  console.log(name, "images:", images.length);
  images.forEach((img) => console.log(" ", path.basename(img.file), img.size));
}
