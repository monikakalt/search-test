import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search.component';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
