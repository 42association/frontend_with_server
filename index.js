// index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  handleCallback,
  handlePeople,
  handleNew,
  handleSojiday,
  handleSojihaveto,
  handleSojidid,
  handleRedirect,
} from "./handler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT; // デフォルトポートの設定

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/new", handleNew);
app.get("/callback", handleCallback);
app.get("/redirect", handleRedirect);
app.get("/people", handlePeople);
app.get("/soji", handleSojiday);
app.get("/soji/did", handleSojidid);
app.get("/soji/haveto", handleSojihaveto);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
