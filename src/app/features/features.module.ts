import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../home/home.module';
import { BooksModule } from './books/books.module';
import {AuthorsModule} from "./authors/authors.module";
import {GenresModule} from "./genres/genres.module";
import {PublisherModule} from "./publisher/publisher.module";
import {UsersModule} from "./users/users.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    BooksModule,
    AuthorsModule,
    GenresModule,
    PublisherModule,
    UsersModule
  ],
  exports:[]
})
export class FeaturesModule { }
