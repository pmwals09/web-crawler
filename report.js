/**
 * Prints a report of the crawl.
 * @param {{[key: string]: number}} pages - The pages object.
 */
function printReport(pages) {
  console.log("Beginning report...");
  Object.keys(pages)
    .sort((a, b) => pages[b] - pages[a])
    .forEach((page) => {
      console.log(`Found ${pages[page]} internal links to ${page}`);
    });
}

module.exports = {
  printReport,
};
