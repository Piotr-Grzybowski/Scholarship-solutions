import server from "../server";
import request from "supertest";

const app = server();

app.addController("/products/:id", "post", (req, res) => {
  res.json({
    body: req.body,
    params: req.params,
    query: req.query,
  });
});

app.addMiddleware("/products/:id", "post", (req, res, next) => {
  if (req.params.id === "10") {
    req.params.id = "1000";
  }
  next();
});

app.addController("/products", "post", (req, res) => {
  res.send("Products list");
});

app.addMiddleware("/products", "post", (req, res, next) => {
  type product = {
    name: string;
    brand: string;
    price: number;
  };
  let products: product[] = [];
  if (Object.keys(req.body).length > 0) {
    const name: string = req.body.name;
    const brand: string = req.body.brand;
    const price: number = req.body.price;

    products.push({ name, brand, price });

    res.json(products);
  } else next();
});

app.addController("/", "get", (req, res) => {
  res.end("Finished");
});

describe("GET / - a simple api endpoint", () => {
  const body = {
    name: "Single malt whiskey",
    brand: "Chivas Regal",
    price: "35 pounds",
  };
  it("server should work on root path", async () => {
    const result = await request(app.server).get("/");
    expect(result.text).toEqual("Finished");
    expect(result.statusCode).toEqual(200);
  });
  it("server should return proper params, query and body", async () => {
    const result = await request(app.server)
      .post("/products/12?name=john")
      .send(body);
    expect(result.statusCode).toEqual(200);
    expect(result.body.body).toStrictEqual(body);
    expect(result.body.params.id).toBe("12");
    expect(result.body.query.name).toBe("john");
  });
  it("middleware and controllers should be processed in the right order on the same route", async () => {
    const result = await request(app.server).post("/products/10").send(body);
    // when params.id equal to 10 middleware should change it to 1000 but don't stop other callers
    expect(result.statusCode).toEqual(200);
    expect(result.body.params.id).toBe("1000");

    const anotherResult = await request(app.server)
      .post("/products")
      .send(body);
    // when req.body is not empty middleware should return those values and finish request cycle
    expect(anotherResult.statusCode).toEqual(200);
    expect(anotherResult.body[0]).toStrictEqual(body);
    expect(anotherResult.text).not.toBe("Products List");

    const andAnotherResult = await request(app.server)
      .post("/products")
      .send({});
    // when req.body is empty middleware should continue cycle and allow other middlewares and finally controller to run
    expect(andAnotherResult.statusCode).toEqual(200);
    expect(andAnotherResult.body).toStrictEqual({});
    expect(andAnotherResult.text).toBe("Products list");
  });
  it("server should response with 404 when route not registered", async () => {
    const result = await request(app.server).get("/notexistingroute");
    expect(result.statusCode).toBe(404);
    expect(result.text).toBe("Not found");
  });
});
