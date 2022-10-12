console.log("About to start a server...");

import express from "express";
import serveIndex from "serve-index";
import cors from "cors";
import { Article } from "./interfaces/Article";

const app = express();
const port = 3000;
const wwwDir = "../front/dist/front";

const articles: Article[] = [
  {
    name: "Tournevis",
    price: 3.45,
    qty: 100,
  },
  {
    name: "Tournevis cruciforme",
    price: 4.5,
    qty: 100,
  },
  {
    name: "Tondeuse à gazon",
    price: 250,
    qty: 3,
  },
  {
    name: "Pelle",
    price: 5,
    qty: 150,
  },
];

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

app.get("/api/date", (req, res) => {
  res.json({ date: new Date() });
});

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.post("/api/articles", (req, res) => {
  const article = req.body;
  articles.push(article);
  res.status(201).end();
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
