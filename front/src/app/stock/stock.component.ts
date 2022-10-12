import { Component, OnInit } from '@angular/core';
import { Article } from 'src/interfaces/Article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  articles: Article[] = [
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

  constructor() {}

  ngOnInit(): void {}
}
