import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksReadComponent } from './books-read/books-read.component';
import { BooksCreateComponent } from './books-create/books-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SkeletonModule } from 'primeng/skeleton';
import { BookService } from 'src/app/shared/services/book/book.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {ImageModule} from 'primeng/image';
import {RippleModule} from "primeng/ripple";
import {MatSortModule} from "@angular/material/sort";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {BooksUpdateComponent } from './books-update/books-update.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AuthorService} from "../../shared/services/author/author.service";
import {GenresService} from "../../shared/services/genres/genres.service";
import {PublisherService} from "../../shared/services/publisher/publisher.service";
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    BooksReadComponent,
    BooksCreateComponent,
    BooksUpdateComponent
  ],
    imports: [
        MatTableModule,
        AppRoutingModule,
        MatPaginatorModule,
        MatDialogModule,
        CommonModule,
        SkeletonModule,
        MatIconModule,
        MatFormFieldModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        DynamicDialogModule,
        InputTextModule,
        MultiSelectModule,
        FormsModule,
        InputNumberModule,
        CalendarModule,
        TooltipModule,
        InputTextareaModule,
        DropdownModule,
        ImageModule,
        RippleModule,
        MatSortModule,
        MessagesModule,
        MessageModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ConfirmPopupModule
    ],
  exports:[
    BooksReadComponent,
    BooksCreateComponent,
    BooksUpdateComponent
  ],
  providers:[
    BookService,
    AuthorService,
    GenresService,
    PublisherService,
    MessageService
  ]
})
export class BooksModule { }
