import { Injectable } from '@angular/core';
import { Article } from 'src/interfaces/Article';

const ARTICLE_KEY = 'articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.getArticles();

  constructor() {}

  getArticles(): Article[] {
    const str = localStorage.getItem(ARTICLE_KEY);
    if (str === null) {
      return [
        {
          name: 'Tournevis',
          price: 3.45,
          qty: 100,
        },
        {
          name: 'Tournevis cruciforme',
          price: 4.5,
          qty: 100,
        },
        {
          name: 'Tondeuse à gazon',
          price: 250,
          qty: 3,
        },
        {
          name: 'Pelle',
          price: 5,
          qty: 150,
        },
      ];
    }
    return JSON.parse(str);
  }

  add(a: Article) {
    this.articles.push(a);
    localStorage.setItem(ARTICLE_KEY, JSON.stringify(this.articles));
  }
}
