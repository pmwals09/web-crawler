const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

function main() {
  if (process.argv.length < 3) {
    console.log("Please provide a base URL");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Please provide only one base URL");
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`Crawling ${baseURL}`);
  crawlPage(baseURL, baseURL, {}).then((pages) => {
    printReport(pages);
  });
}
main();
