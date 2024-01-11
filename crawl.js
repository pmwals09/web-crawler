/**
  * Accepts a valid URL and returns a normalized version of the URL with the following rules:
  * - Remove trailing slashes
  * - Remove the protocol
  * @param {string} path - A valid URL
  * @returns {string} A normalized version of the URL
  */
function normalizeURL(path) {
  const url = new URL(path);
  return `${url.hostname}${url.pathname}`.replace(/\/$/, '');
}

module.exports = {
  normalizeURL,
};
