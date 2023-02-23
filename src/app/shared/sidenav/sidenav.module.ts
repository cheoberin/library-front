import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
  ],
  exports:[
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
  ]
})
export class SidenavModule { }
