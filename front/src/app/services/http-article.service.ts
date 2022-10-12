import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/interfaces/Article';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('instantiate http article service');
    this.refresh();
  }

  override refresh(): void {
    super.refresh();
    this.http.get<Article[]>(url).subscribe({
      next: (articles) => {
        console.log('articles: ', articles);
        this.articles = articles;
        this.save();
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });
  }

  override add(a: Article): void {
    super.add(a);
    console.log('add http article');
    this.http.post(url, a).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });
  }
}
