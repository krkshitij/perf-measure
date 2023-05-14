import fs from "fs";
import chromeLauncher from "chrome-launcher";
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
    const browser = await chromeLauncher.launch({
      chromeFlags: ["--headless"],
      chromePath:
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    });

    const runnerResult = await lighthouse(
      url,
      {
        port: browser.port,
        output: "html",
        logLevel: "info",
        onlyCategories: ["performance"],
      },
      config
    );

    fs.writeFileSync(
      path.join(__dirname, "..", "reports", "chrome-launcher-lh-report.html"),
      runnerResult.report
    );

    await browser.kill();
  } catch (error) {
    console.error("Error!", error);
  }
})();
