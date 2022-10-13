import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from 'src/interfaces/Article';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles';
const DELAY = environment.delay;

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
    await lastValueFrom(timer(DELAY));
    const articles = await lastValueFrom(this.http.get<Article[]>(url));
    console.log('articles: ', articles);
    this.articles = articles;
    this.save();
  }

  override async add(a: Article): Promise<void> {
    await super.add(a);
    console.log('add http article');
    await lastValueFrom(this.http.post(url, a).pipe(delay(DELAY)));
    await this.refresh();
  }

  override async remove(selectedArticles: Set<Article>): Promise<void> {
    await super.remove(selectedArticles);
    console.log('remove selected articles');
    const ids = [...selectedArticles].map((a) => a.id);
    await lastValueFrom(
      this.http
        .delete(url, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          body: ids,
        })
        .pipe(delay(DELAY))
    );

    await this.refresh();
  }
}
