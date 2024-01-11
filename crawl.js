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
  return `${url.hostname}${url.pathname}`.replace(/\/$/, "");
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
      console.log(url.href);
      link.href = url.href;
    }
    urls.push(link.href);
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
