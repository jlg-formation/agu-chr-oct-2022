import { Component, OnInit } from '@angular/core';
import { Article } from 'src/interfaces/Article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  selectedArticles = new Set<Article>();
  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {}

  refresh() {
    console.log('refresh');
    this.articleService.refresh();
  }

  toggle(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
