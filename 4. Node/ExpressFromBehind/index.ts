import { createServer, IncomingMessage, ServerResponse } from "http";
const host = "localhost";
const port = 3000;

interface a {
  url: string;
  middlewares: Function[];
  controller: Function;
}

const a = [
  {
    url: "/one",
    middlewares: [
      (req, res, next) => {
        // res.writeHead(200);
        // res.end(JSON.stringify({ next: req.next }));
        next(new Error("JSSSS"));
      },
      (req, res, next) => {
        console.log("I am the middle man");
        console.log(req.method);
        req.next = "Next time";
        next();
      },
    ],
    controller: (req, res) => {
      res.writeHead(200);
      res.end(books);
    },
  },
  {
    url: "/two",
    middlewares: [
      (req, res, next) => {
        console.log("I am the another middle man");
        req.next = "Wonderful time in wonder land";
        next();
      },
      (req, res, next) => {
        next();
      },
    ],
    controller: (req, res) => {
      res.writeHead(200);
      res.end(books);
    },
  },
];

function addMiddleware(
  endpoint: string,
  middleware: (
    req: IncomingMessage,
    res: ServerResponse,
    next: (error?: Error) => void
  ) => void
) {
  const route = a.find((b) => b.url === endpoint);

  if (route) {
    route.middlewares.push(middleware);
  } else {
    const newRoute = {
      url: endpoint,
      middlewares: [middleware],
      controller: () => {},
    };
    a.push(newRoute);
  }
}

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");

  const route = a.find((b) => b.url === req.url);

  if (route) {
    for (let middleware of route.middlewares) {
      if (!res.writableEnded) {
        middleware(req, res, (error?) => {
          if (error) throw error;
          return;
        });
      }
    }
    if (!res.writableEnded) route.controller(req, res);
  } else {
    res.writeHead(500);
    res.end(JSON.stringify({ Error: "Could not find route!" }));
  }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

const books = JSON.stringify([
  { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { title: "The Prophet", author: "Kahlil Gibran", year: 1923 },
]);
