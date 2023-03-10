import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksReadComponent } from './features/books/books-read/books-read.component';
import { HomeComponent } from './features/home/home.component';
import {FooterComponent} from "./core/components/footer/footer.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'books',
    component: BooksReadComponent
  },
  {path:'test',
    component:FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
