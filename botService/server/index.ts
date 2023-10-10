import { startBot } from "./bot/Telegraf";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./environment");
// require("./bot/Telegraf");

const routes = require("./routes");
// const { both } = require("ramda");

const port = process.env.PORT;
const origin = process.env.ORIGIN;
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin,
  })
);

app.use("/", routes);

startBot();

app.listen(port, () => console.log(`Server is listening on port ${port}`));
