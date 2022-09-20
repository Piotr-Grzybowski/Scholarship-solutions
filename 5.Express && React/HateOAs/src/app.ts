import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { usersRouter } from "./routes/user.router";
import { channelsRouter } from "./routes/channel.route";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import hateoasLinker from "./middleware/hateoas.middleware";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("*", (req, res, next) => hateoasLinker(req, res, next));
app.use("/users/", usersRouter);
app.use("/users/:id/channels/", channelsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
