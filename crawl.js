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

async function crawlPage(currentURL) {
  try {
    const res = await fetch(currentURL);
    if (res.status >= 400) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return;
    }
    console.log("Headers", res.headers.get("content-type"));
    if (!res.headers.get("content-type").includes("text/html")) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return;
    }
    console.log(await res.text());
  } catch(err) {
    console.error(err);
    return
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
