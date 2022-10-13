console.log("About to start a server...");

import express from "express";
import serveIndex from "serve-index";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { Article } from "./interfaces/Article";

const app = express();
const port = 3000;
const wwwDir = "../front/dist/front";

const generateId = (): string => {
  return uuidv4();
  // return Date.now() + "_" + Math.floor(Math.random() * 1e9);
};

let articles: Article[] = [
  {
    id: "a1",
    name: "Tournevis",
    price: 3.45,
    qty: 100,
  },
  {
    id: "a2",
    name: "Tournevis cruciforme",
    price: 4.5,
    qty: 100,
  },
  {
    id: "a3",
    name: "Tondeuse à gazon",
    price: 250,
    qty: 3,
  },
  {
    id: "a4",
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
  article.id = generateId();
  articles.push(article);
  res.status(201).end();
});

app.delete("/api/articles", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
