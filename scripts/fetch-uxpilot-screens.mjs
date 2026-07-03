import fs from "fs";
import path from "path";

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

const outDir = path.resolve("design-refs");
fs.mkdirSync(outDir, { recursive: true });

async function probeShare(id) {
  const url = `https://uxpilot.ai/s/${id}`;
  const candidates = [
    url,
    `https://ux.uxpilot.ai/api/public/share/${id}`,
    `https://ux.uxpilot.ai/api/share/${id}`,
    `https://ux.uxpilot.ai/api/v1/public/share/${id}`,
    `https://ux.uxpilot.ai/api/v1/share/${id}`,
    `https://ux.uxpilot.ai/api/screens/share/${id}`,
  ];

  const results = {};
  for (const c of candidates) {
    try {
      const res = await fetch(c, {
        headers: { Accept: "application/json, text/html, */*" },
      });
      const text = await res.text();
      results[c] = {
        status: res.status,
        type: res.headers.get("content-type"),
        len: text.length,
        preview: text.slice(0, 300),
        isJson: text.trim().startsWith("{"),
      };
      if (results[c].isJson) {
        fs.writeFileSync(path.join(outDir, `${id}.json`), text);
      }
    } catch (e) {
      results[c] = { error: String(e) };
    }
  }
  return { id, url, results };
}

for (const [flow, ids] of Object.entries(FLOWS)) {
  console.log(`\n### ${flow.toUpperCase()} ###`);
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    console.log(`\n[${i + 1}/${ids.length}] ${id}`);
    const probe = await probeShare(id);
    for (const [endpoint, info] of Object.entries(probe.results)) {
      if (info.isJson || (info.status === 200 && info.len > 500 && !info.preview?.includes("<!DOCTYPE"))) {
        console.log("  HIT", endpoint, info.status, info.type, info.len);
        console.log("  ", info.preview);
      }
    }
  }
}
