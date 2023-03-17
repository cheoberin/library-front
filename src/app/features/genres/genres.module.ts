import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresReadComponent } from './genres-read/genres-read.component';
import { GenresCreateComponent } from './genres-create/genres-create.component';
import { GenresUpdateComponent } from './genres-update/genres-update.component';
import {MatTableModule} from "@angular/material/table";
import {AppRoutingModule} from "../../app-routing.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {TooltipModule} from "primeng/tooltip";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {MatSortModule} from "@angular/material/sort";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {SkeletonModule} from "primeng/skeleton";
import {MessageService} from "primeng/api";
import {GenresService} from "../../shared/services/genres/genres.service";

@NgModule({
  declarations: [
    GenresReadComponent,
    GenresCreateComponent,
    GenresUpdateComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    AppRoutingModule,
    MatPaginatorModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    DynamicDialogModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    TooltipModule,
    InputTextareaModule,
    RippleModule,
    MatSortModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    SkeletonModule,
  ],
  exports:[
    GenresReadComponent,
    GenresCreateComponent,
    GenresUpdateComponent
  ],
  providers:[
    MessageService,
    GenresService
  ]

})
export class GenresModule { }
