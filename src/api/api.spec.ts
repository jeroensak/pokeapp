import fetch from "jest-fetch-mock";
import Api from "./api";

describe("API", () => {
  afterAll(fetch.resetMocks)

  it("should perform a get without query params", async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "fake-data" }));

    const api = new Api("https://baseurl.com/");
    const response = await api.get("fake-path");

    expect(response.data).toEqual({ data: "fake-data" });
    expect(response.error).toBeNull();
  });

  it("should perform a get with query params in record type", () => {
    fetch.mockResponseOnce((req) => {
      expect(req.url).toEqual("https://baseurl.com/?query1=yes&query2=no");
      return Promise.resolve("data");
    });

    const api = new Api("https://baseurl.com/");
    api.get("", { query1: "yes", query2: "no" });
  });

  it("should perform a get with query params in string type", () => {
    fetch.mockResponseOnce((req) => {
      expect(req.url).toEqual("https://baseurl.com/?query1=yes&query2=no");
      return Promise.resolve("data");
    });

    const api = new Api("https://baseurl.com/");
    api.get("", "query1=yes&query2=no");
  });

  it("should perform a get and return an error", async () => {
    fetch.mockRejectOnce(new Error());

    const api = new Api("https://baseurl.com/");
    const response = await api.get("fake-path");
    expect(response.data).toBeNull();
    expect(response.error).not.toBeNull();
  });
});
