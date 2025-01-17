import express, { json } from "express";
import { mainRouter } from "./router";

const app = express();
const port = 3333;

app.use(json());

app.use("/api", mainRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server running at http://localhost:${port}`);
});
