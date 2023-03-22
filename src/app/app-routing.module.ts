import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksReadComponent } from './features/books/books-read/books-read.component';
import { HomeComponent } from './features/home/home.component';
import {AuthorsReadComponent} from "./features/authors/authors-read/authors-read.component";
import {GenresReadComponent} from "./features/genres/genres-read/genres-read.component";
import {PublisherReadComponent} from "./features/publisher/publisher-read/publisher-read.component";
import {UsersReadComponent} from "./features/users/users-read/users-read.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'books',
    component: BooksReadComponent
  },
  {path:'authors',
    component:AuthorsReadComponent
  },
  {path:'genres',
  component:GenresReadComponent
  },
  {path:'publishers',
  component:PublisherReadComponent
  },
  {path:'users',
  component:UsersReadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
