import fs from "fs";
import path from "path";
import { chromium } from "playwright-core";

const FLOWS = {
  customer: [
    "bc966f65881bb69dee37a9c4eab149c2",
    "39c30b16faf88bb58fd5d49df0e3024e",
    "c2eee8681cb2023a6ce3b13da03d58be",
    "88b769f6055408a7ca1f7e2ea286bda0",
    "15cc0230911a9dbf5331057d015e7e95",
    "308584feab4d090fc457c1768658c277",
  ],
  merchant: [
    "5320f0aaea241611f3c56700f5c41d26",
    "4a20d062c76f6dcfece1f3491481d8bf",
    "07d3b6222dc5eb855a4b154b289ca172",
    "706c69ebbcb0db27d815a505f1272cba",
    "95a437bc6d4e9b4efe96f21e5640a7f6",
    "a81658314f297d138cd1121b835f1324",
    "c99befcfea463bb0ed0e4982a9f40f6c",
    "690f7b7cf2244b03d4bba8e9dd58c23e",
    "16c69c14d827019780b44862007f0159",
    "9edf7eec4bf6155a594e8936398e6300",
    "36968e7ae40ee905682a90c30ad7554e",
  ],
};

const outDir = path.resolve("design-refs/screenshots");
fs.mkdirSync(outDir, { recursive: true });

const chromePaths = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA + "/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];

const executablePath = chromePaths.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Edge found");
  process.exit(1);
}

console.log("Using browser:", executablePath);

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

const manifest = [];

for (const [flow, ids] of Object.entries(FLOWS)) {
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const url = `https://uxpilot.ai/s/${id}`;
    const page = await browser.newPage();
    console.log(`Capturing ${flow} ${i + 1}/${ids.length}: ${id}`);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
      await page.waitForTimeout(5000);

      const title = await page.title();
      const bodyText = await page.evaluate(() => document.body?.innerText?.slice(0, 500) ?? "");

      const shotPath = path.join(outDir, `${flow}-${String(i + 1).padStart(2, "0")}-${id}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });

      // Try to get iframe or design canvas HTML
      const htmlSnippet = await page.evaluate(() => {
        const iframe = document.querySelector("iframe");
        if (iframe?.src) return { iframe: iframe.src };
        const pre = document.querySelector("pre,code");
        if (pre) return { code: pre.textContent?.slice(0, 2000) };
        const headings = [...document.querySelectorAll("h1,h2,h3")].map((h) => h.textContent?.trim());
        return { headings, text: document.body.innerText.slice(0, 1500) };
      });

      manifest.push({
        flow,
        index: i + 1,
        id,
        url,
        title,
        shotPath,
        ...htmlSnippet,
      });

      fs.writeFileSync(
        path.join(outDir, `${flow}-${String(i + 1).padStart(2, "0")}-${id}.json`),
        JSON.stringify({ title, bodyText, htmlSnippet }, null, 2),
      );
    } catch (err) {
      manifest.push({ flow, index: i + 1, id, url, error: String(err) });
      console.error("  ERROR:", err.message);
    } finally {
      await page.close();
    }
  }
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
await browser.close();
console.log("Done. Manifest:", path.join(outDir, "manifest.json"));
