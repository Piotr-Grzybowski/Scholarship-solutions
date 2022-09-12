import server from "../server";
import request from "supertest";
import limiter from "api-call-limiter";

const app = server();

app.addController("/products", "get", (req, res) => {
  res.end("Products list");
});

// for testing purpose expiration time is set on one second
app.addMiddleware("/products", "get", limiter(5, 1000));

app.addController("/", "get", (req, res) => {
  res.end("Finished");
});

describe("Testing call limiter from npm registry", () => {
  test("When limit of calls not reached, server should respond with `Products list` text", async () => {
    for (let i = 1; i <= 5; i++) {
      const response = await request(app.server).get("/products");
      expect(response.headers["x-ratelimit-remaining"]).toBe(
        Math.floor(5 - i).toString()
      );
      expect(response.headers["x-ratelimit-limit"]).toBe("5");
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("Products list");
    }
  });
  test("when limit reached, middleware should return 429 and `Requests limit reached!`", async () => {
    const response = await request(app.server).get("/products");
    expect(response.statusCode).toBe(429);
    expect(response.text).toBe("Requests limit reached!");
  });
  test("after expiration time server should again respond with `Products list` text", async () => {
    setTimeout(async () => {
      const response = await request(app.server).get("/products");
      expect(response.headers["x-ratelimit-remaining"]).toBe(
        Math.floor(4).toString()
      );
      expect(response.headers["x-ratelimit-limit"]).toBe("5");
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("Products list");
    }, 1000);
  });
});
