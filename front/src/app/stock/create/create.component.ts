import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAdd, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/interfaces/Article';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('Truc', [Validators.required]),
    price: new FormControl(1, [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
  });
  faAdd = faAdd;
  faCircleNotch = faCircleNotch;

  isAdding = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  async submit() {
    try {
      this.isAdding = true;
      console.log('submit');
      await this.articleService.add(this.f.value as Article);
      this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isAdding = false;
    }
  }
}
