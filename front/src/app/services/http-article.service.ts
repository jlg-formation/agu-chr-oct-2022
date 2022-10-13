import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, timer } from 'rxjs';
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

  override async refresh(): Promise<void> {
    await super.refresh();
    await lastValueFrom(timer(1500));
    const articles = await lastValueFrom(this.http.get<Article[]>(url));
    console.log('articles: ', articles);
    this.articles = articles;
    this.save();
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

  override remove(selectedArticles: Set<Article>): void {
    super.remove(selectedArticles);
    console.log('remove selected articles');
    const ids = [...selectedArticles].map((a) => a.id);
    this.http
      .delete(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: ids,
      })
      .subscribe({
        next: () => {
          this.refresh();
        },
        error: (err) => {
          console.log('err: ', err);
        },
      });
  }
}
