const { test, expect, describe } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl");

describe("normalizeURL", () => {
  const expected = "blog.boot.dev/path";
  test("https with trailing slash", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
      "https://" + expected,
    );
  });
  test("https without trailing slash", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe(
      "https://" + expected,
    );
  });
  test("http with trailing slash", () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe(
      "http://" + expected,
    );
  });
  test("http without trailing slash", () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe(
      "http://" + expected,
    );
  });
});

describe("getURLsFromHTML", () => {
  const html = `
  <html>
    <head>
      <title>My Blog</title>
    </head>
    <body>
      <a href="http://blog.boot.dev/path/1">First Link</a>
      <a href="http://blog.boot.dev/path/2">Second Link</a>
      <a href="https://blog.boot.dev/path/3">Third Link</a>
      <a href="/path/4">Fourth Link</a>
    </body>
  </html>
  `;
  test("Get all URLs from HTML", () => {
    expect(getURLsFromHTML(html, "http://blog.boot.dev").length).toBe(4);
  });
  test("Gets an http link", () => {
    expect(getURLsFromHTML(html, "http://blog.boot.dev")[1]).toBe(
      "http://blog.boot.dev/path/2",
    );
  });
  test("Gets a https link", () => {
    expect(getURLsFromHTML(html, "http://blog.boot.dev")[2]).toBe(
      "https://blog.boot.dev/path/3",
    );
  });
  test("Make relative paths absolute", () => {
    expect(getURLsFromHTML(html, "http://blog.boot.dev")[3]).toBe(
      "http://blog.boot.dev/path/4",
    );
  });
});
