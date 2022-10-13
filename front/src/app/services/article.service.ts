import { Injectable } from '@angular/core';
import { Article } from 'src/interfaces/Article';

const ARTICLE_KEY = 'articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.getArticles();

  constructor() {}

  async add(a: Article) {
    this.articles.push(a);
    this.save();
  }

  getArticles(): Article[] {
    const str = localStorage.getItem(ARTICLE_KEY);
    if (str === null) {
      return [];
    }
    return JSON.parse(str);
  }

  async refresh() {
    this.articles = this.getArticles();
  }

  async remove(selectedArticles: Set<Article>) {
    this.articles = this.articles.filter((a) => !selectedArticles.has(a));
    this.save();
  }

  save() {
    localStorage.setItem(ARTICLE_KEY, JSON.stringify(this.articles));
  }
}
