import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  declarations: [StockComponent, CreateComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    WidgetModule,
  ],
})
export class StockModule {}
