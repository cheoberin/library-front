import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { BooksModule } from './books/books.module';
import {AuthorsModule} from "./authors/authors.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    BooksModule,
    AuthorsModule
  ],
  exports:[]
})
export class FeaturesModule { }
