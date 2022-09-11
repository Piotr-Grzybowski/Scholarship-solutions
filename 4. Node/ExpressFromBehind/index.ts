import server from "./server";

const app = server();

// app.addController("/products/:id", "get", (req, res) => {
//   console.log("query params", req.query);
//   console.log("req.params", req.params);
//   res.send(`Product id is ${req.params.id}`);
// });

// app.addController("/products", "get", (req, res) => {
//   console.log("query params", req.query);
//   res.send("text");
// });

// app.addController("/products", "post", (req, res) => {
//   console.info("body", req.body);
//   res.json(req.query);
// });

// app.addController("/details/:id/new", "get", (req, res) => {
//   console.log("body", req.body);
//   console.log("req params", req.params);
//   console.log("query params", req.query);
//   res.json(`Details of products with id ${req.body.author}`);
// });

// app.addController("/details", "get", (req, res) => {
//   console.log("body", req.body);
//   console.log("req params", req.params);
//   console.log("query params", req.query);
//   res.json(`Check the details`);
// });

// app.addMiddleware("/details", "get", (req, res, next) => {
//   next();
// });

// app.addMiddleware("/details", "get", (req, res, next) => {
//   console.log(req);
//   next();
// });

// app.addController("/details", "get", (req, res) => {
//   res.json(`Changed controller`);
// });

// app.addController("/", "get", (req, res) => {
//   console.log("body", req.body);
//   console.log("req params", req.params);
//   console.log("query params", req.query);
//   res.end("Finished");
// });
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

    res.writeHead(200).json(products);
  } else next();
});

app.addController("/", "get", (req, res) => {
  res.end("Finished");
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
