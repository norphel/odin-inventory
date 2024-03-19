import express from "express";

const app = express();

app.set("views", "src/views");
app.set("view engine", "pug");

import indexRouter from "./routes/index.routes.js";
import itemRouter from "./routes/item.routes.js";
import categoryRouter from "./routes/category.routes.js";

app.use("/", indexRouter);
app.use("/items", itemRouter);
app.use("/categories", categoryRouter);

export { app };
