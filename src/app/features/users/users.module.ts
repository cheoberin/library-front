import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersReadComponent } from './users-read/users-read.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersUpdateComponent } from './users-update/users-update.component';



@NgModule({
  declarations: [
    UsersReadComponent,
    UsersCreateComponent,
    UsersUpdateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
