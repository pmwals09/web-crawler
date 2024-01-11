const { test, expect, describe } = require("@jest/globals");
const { normalizeURL } = require("./crawl");

describe("normalizeURL", () => {
  const expected = "blog.boot.dev/path";
  test("https with trailing slash", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(expected);
  });
  test("https without trailing slash", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe(expected);
  });
  test("http with trailing slash", () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe(expected);
  });
  test("http without trailing slash", () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe(expected);
  });
});
