import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const URL_REGEX = /url:\s*["'](https?:\/\/[^"']+)["']/g;

function collectUrls() {
  const results = [];
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error("Folder content/ tidak ditemukan.");
    process.exit(1);
  }

  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
    const fullPath = path.join(CONTENT_DIR, file);
    const text = fs.readFileSync(fullPath, "utf8");
    let match;
    while ((match = URL_REGEX.exec(text)) !== null) {
      results.push({ file, url: match[1] });
    }
  }
  return results;
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SehatJiwaLinkChecker/1.0)",
      },
    });
    if (res.status === 405 || res.status === 403 || res.status === 404) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; SehatJiwaLinkChecker/1.0)",
        },
      });
    }
    return {
      ok: res.status >= 200 && res.status < 400,
      status: res.status,
      finalUrl: res.url,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const items = collectUrls();
  console.log(`Memeriksa ${items.length} tautan di content/*...\n`);

  let failed = 0;
  for (const item of items) {
    const res = await checkUrl(item.url);
    if (res.ok) {
      const redirected = res.finalUrl && res.finalUrl !== item.url;
      console.log(
        `[OK ${res.status}] (${item.file}) ${item.url}${
          redirected ? ` -> ${res.finalUrl}` : ""
        }`
      );
    } else {
      failed += 1;
      console.error(
        `[FAIL ${res.status}] (${item.file}) ${item.url}${
          res.error ? ` (${res.error})` : ""
        }`
      );
    }
  }

  console.log(`\nSelesai: ${items.length - failed}/${items.length} tautan valid.`);
  if (failed > 0) {
    process.exit(1);
  }
}

main();
