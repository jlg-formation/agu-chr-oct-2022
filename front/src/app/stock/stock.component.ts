import { Component, OnInit } from '@angular/core';
import {
  faAdd,
  faCircleNotch,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/interfaces/Article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  faAdd = faAdd;
  faCircleNotch = faCircleNotch;
  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {}

  async refresh() {
    try {
      console.log('refresh');
      this.isRefreshing = true;
      await this.articleService.refresh();
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
    }
  }

  async remove() {
    try {
      this.isRemoving = true;
      console.log('about to remove');
      await this.articleService.remove(this.selectedArticles);
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRemoving = false;
    }
  }

  toggle(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
