import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksReadComponent } from './features/books/books-read/books-read.component';
import { HomeComponent } from './home/home.component';
import {AuthorsReadComponent} from "./features/authors/authors-read/authors-read.component";
import {GenresReadComponent} from "./features/genres/genres-read/genres-read.component";
import {PublisherReadComponent} from "./features/publisher/publisher-read/publisher-read.component";
import {UsersReadComponent} from "./features/users/users-read/users-read.component";
import {AuthGuard} from "./shared/services/guard/auth.guard";
import {LoginComponent} from "./core/components/login/login.component";

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'books',
    component: BooksReadComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'authors',
    component:AuthorsReadComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'genres',
    component:GenresReadComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'publishers',
    component:PublisherReadComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'users',
    component:UsersReadComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
