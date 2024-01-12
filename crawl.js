const { JSDOM } = require("jsdom");

/**
 * Accepts a valid URL and returns a normalized version of the URL with the following rules:
 * - Remove trailing slashes
 * - Remove the protocol
 * @param {string} path - A valid URL
 * @returns {string} A normalized version of the URL
 */
function normalizeURL(path) {
  const url = new URL(path);
  return `${url.protocol}//${url.hostname}${url.pathname}`.replace(/\/$/, "");
}

/**
 * Extract all of the URLs from a string of HTML
 * @param {string} html- A string of HTML
 * @param {string} baseURL - The base URL to use when making relative paths absolute
 * @returns {string[]} An array of URLs
 */
function getURLsFromHTML(html, baseURL) {
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll("a");
  const urls = [];
  for (let link of links) {
    if (!link.href.startsWith("http")) {
      const url = new URL(link.href, baseURL);
      link.href = url.href;
    }
    urls.push(link.href);
  }
  return urls;
}

/**
 * Crawls a page and all of its links
 * @param {string} baseURL - The base URL to use when making relative paths absolute
 * @param {string} currentURL - The current URL to crawl
 * @param {{[key: string]: number}} pages - A count of URLs that have already been crawled
 * @returns {Promise<{[key: string]: number}>} A count of URLs that have already been crawled
 */
async function crawlPage(baseURL, currentURL, pages) {
  const current = new URL(currentURL);
  const base = new URL(baseURL);
  if (current.hostname !== base.hostname) {
    return pages;
  }
  const normalizedCurrent = normalizeURL(currentURL);
  if (pages[normalizedCurrent]) {
    pages[normalizedCurrent]++;
  } else {
    pages[normalizedCurrent] = 1;
    try {
      console.log(`Crawling ${normalizedCurrent}`);
      const res = await fetch(normalizedCurrent);
      if (res.status >= 400) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        return pages;
      }
      if (!res.headers.get("content-type").includes("text/html")) {
        console.error(`Error: ${res.status} ${res.statusText}, ${res.headers.get("content-type")}`);
        return pages;
      }

      const newURLs = getURLsFromHTML(await res.text(), baseURL);
      for (const url of newURLs) {
        await crawlPage(baseURL, url, pages);
      }
      return pages;
    } catch (err) {
      console.error(err);
      return pages;
    }
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
