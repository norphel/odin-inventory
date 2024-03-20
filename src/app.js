import express from "express";

const app = express();

app.set("views", "src/views");
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

import indexRouter from "./routes/index.routes.js";
import itemRouter from "./routes/item.routes.js";
import categoryRouter from "./routes/category.routes.js";

app.use("/", indexRouter);
app.use("/items", itemRouter);
app.use("/categories", categoryRouter);

export { app };
