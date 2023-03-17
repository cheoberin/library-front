import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../shared/services/book/book.service";
import {Book} from "../../../core/models/book";
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {IAuthor} from "../../../core/models/Author";
import {IGenre} from "../../../core/models/Genre";
import {IPublisher} from "../../../core/models/Publisher";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthorService} from "../../../shared/services/author/author.service";
import {GenresService} from "../../../shared/services/genres/genres.service";
import {PublisherService} from "../../../shared/services/publisher/publisher.service";
import {catchError, forkJoin, tap, throwError} from "rxjs";


@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.scss'],
  providers:[ConfirmationService]
})
export class BooksCreateComponent implements OnInit{
  imgLinkDefault!: string;
  publishers!: IPublisher[];
  authors!: IAuthor[];
  genres!: IGenre[];
  private newBook!: Book;
  bookForm!: FormGroup;

  constructor(private bookService: BookService,
              private authorService: AuthorService,
              private genreService: GenresService,
              private  publisherService: PublisherService,
              private fb: FormBuilder,
              public ref: DynamicDialogRef,
              private confirmationCreate: ConfirmationService ){

    this.imgLinkDefault = environment.imageBase;

  }

  create(): void{
    if(this.bookForm.invalid){
      this.bookService.message("Book was not created!","error");
      return;
    }
    this.newBook = new Book(this.bookForm.value)
    this.bookService.create(this.newBook).subscribe((resp) =>{
      this.bookService.message("Book created successfully!","success")
    }, error =>{
      console.log(error)
      this.bookService.message("Book was not created!","error");
    })
  }

  getMultiselectInfos(){
    forkJoin([
      this.authorService.findAll(),
      this.genreService.findAll(),
      this.publisherService.findAll()
    ]).pipe(tap(([authors,genres,publishers]) =>{
      this.authors = authors;
      this.genres = genres;
      this.publishers = publishers;
      }),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    ).subscribe();
  }

  createConfirmation(){
    this.confirmationCreate.confirm({
      message: 'Are you sure that you want to update?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.create();
      }
    })
  }


  closeForm(){
    this.confirmationCreate.confirm({
      message: 'Are you sure that you want cancel?',
      accept: () => {
        this.ref.close();
      }
    })
  }

  ngOnInit() {
    this.bookForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      authors: ['',[Validators.required,Validators.minLength(1)]],
      pages: [null,[Validators.required,Validators.pattern(/^\d+$/)]],
      genres: ['',[Validators.required,Validators.minLength(1)]],
      publicationYear: [null,[Validators.required]],
      asin:['',[Validators.required,Validators.minLength(10)]],
      summary:['',[Validators.required,Validators.minLength(15)]],
      publisher: ['',[Validators.required]],
      bookCover: ['',[Validators.required,Validators.minLength(5)]]
    })
    this.getMultiselectInfos();
  }
}
