import { Component, OnInit } from '@angular/core';
import { Article } from 'src/interfaces/Article';
import { ArticleService } from '../services/article.service';
import {
  faRotateRight,
  faAdd,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  faRotateRight = faRotateRight;
  faAdd = faAdd;
  faTrashCan = faTrashCan;
  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {}

  refresh() {
    console.log('refresh');
    this.articleService.refresh();
    this.selectedArticles.clear();
  }

  remove() {
    console.log('about to remove');
    this.articleService.remove(this.selectedArticles);
    this.selectedArticles.clear();
  }

  toggle(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
