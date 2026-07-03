import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");

const files = [
  "C:/Users/ranbu/Downloads/FoodTrump-Customer UX-030726-141416.pdf",
  "C:/Users/ranbu/Downloads/FoodTrump-Merchant Onboarding and E2E-030726-141339.pdf",
];

function extractUrls(buffer) {
  const raw = buffer.toString("latin1");
  const decoded = raw
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\n/g, "\n");

  const matches = [
    ...decoded.matchAll(/https?:\/\/[^\s<>\)\"'\]\\]+/g),
    ...decoded.matchAll(/\(https?:\/\/[^)]+\)/g),
  ];

  return [
    ...new Set(
      matches.map((m) =>
        (m[1] ?? m[0]).replace(/^\(/, "").replace(/\)$/, "").replace(/\\+$/, ""),
      ),
    ),
  ];
}

for (const file of files) {
  console.log("\n" + "=".repeat(80));
  console.log("FILE:", path.basename(file));
  console.log("=".repeat(80));

  const buffer = fs.readFileSync(file);
  const parser = new PDFParse();
  const data = await parser.parse(buffer);
  console.log("Pages:", data.numpages ?? data.numPages ?? "?");
  console.log("\n--- TEXT ---\n");
  console.log(data.text ?? data.content ?? JSON.stringify(data).slice(0, 5000));

  const urls = extractUrls(buffer);
  console.log("\n--- URLS IN PDF ---\n");
  for (const u of urls) console.log(u);
}
