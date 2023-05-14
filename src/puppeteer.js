import fs from "fs";
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import config from "lighthouse/core/config/lr-desktop-config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url =
  "https://fluentuipr.z22.web.core.windows.net/pull/27415/react-charting/demo/index.html#/examples/linecharttwo";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath:
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    });

    const page = (await browser.pages())[0];
    await page.goto(url, { waitUntil: "networkidle0" });

    const runnerResult = await lighthouse(
      page.url(),
      // url,
      {
        port: new URL(browser.wsEndpoint()).port,
        output: "html",
        logLevel: "info",
        onlyCategories: ["performance"],
      },
      config
    );

    fs.writeFileSync(
      path.join(__dirname, "..", "reports", "puppeteer-lh-report.html"),
      runnerResult.report
    );

    await page.close();
    await browser.close();
  } catch (error) {
    console.error("Error!", error);
  }
})();
