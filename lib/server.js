import express from "express";
import config from "./config";
// import serverRender from './renderers/serverRender';
import mime from "mime";
import cors from "cors";
import morgan from "morgan";
import { extname } from "path";
import chalk from "chalk";

const app = express();
const router = express.Router();

app.use(morgan("combined"));
app.set("view engine", "ejs");

// Middleware for every reqest that comes in
router.use(express.json());
router.use((req, res, next) => {
  console.log(chalk.blue("%s %s %s", req.method, req.url, req.path));
  next();
});

router.use(express.static("public"));
router.use(express.static("public/css"), (req, res, next) => {
  console.log(chalk.yellow("%s %s %s", req.method, req.url, req.path));
  res.set("Content-Type", mime.getType("css"));
  next();
});

router.get("/", async (req, res) => {
  // const initialContent = await serverRender();
  res.render("main");
});

router.post("/login", (req, res) => {
  let un = req.body.user;
  let pw = req.body.pass;

  console.log(`un = ${un}`);
  console.log(`pw = ${pw}`);

  res.send("it worked !");
});

app.use("/", router);

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port} ... b`);
});
