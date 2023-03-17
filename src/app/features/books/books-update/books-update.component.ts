import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BookService} from "../../../shared/services/book/book.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book, IBook} from "../../../core/models/book";
import {IPublisher} from "../../../core/models/Publisher";
import {IAuthor} from "../../../core/models/Author";
import {IGenre} from "../../../core/models/Genre";
import {environment} from "../../../../environments/environment";
import {ConfirmationService} from 'primeng/api';
import {AuthorService} from "../../../shared/services/author/author.service";
import {GenresService} from "../../../shared/services/genres/genres.service";
import {PublisherService} from "../../../shared/services/publisher/publisher.service";
import {catchError, forkJoin, tap, throwError} from "rxjs";


@Component({
  selector: 'app-books-update',
  templateUrl: './books-update.component.html',
  styleUrls: ['./books-update.component.scss'],
  providers:[ConfirmationService]
})
export class BooksUpdateComponent implements OnInit {
  imgLinkDefault: string = environment.imageBase;
  publishers!: IPublisher[];
  authors!: IAuthor[];
  genres!: IGenre[];
  private newBook!: Book;
  book!: IBook;
  bookForm!: FormGroup;
 constructor(private bookService: BookService,
             private authorService: AuthorService,
             private genreService: GenresService,
             private  publisherService: PublisherService,
             private fb: FormBuilder,
             private config: DynamicDialogConfig,public ref: DynamicDialogRef,
             private confirmationUpdate: ConfirmationService){

   this.bookForm = this.fb.group({
     id:[this.config.data.id],
     name:['',[Validators.required,Validators.minLength(3)]],
     authors: ['',[Validators.required,Validators.minLength(1)]],
     pages: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
     genres: ['',[Validators.required,Validators.minLength(1)]],
     publicationYear: ['',[Validators.required]],
     asin:['',[Validators.required,Validators.minLength(10)]],
     summary:['',[Validators.required,Validators.minLength(15)]],
     publisher: ['',[Validators.required]],
     bookCover: [this.imgLinkDefault ,[Validators.required,Validators.minLength(5)]]
   })
 }

  updateConfirmation(){
    this.confirmationUpdate.confirm({
      message: 'Are you sure that you want to update?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.update();
      }
    })
  }

  update(): void{
    this.newBook = new Book(this.bookForm.value)
    this.bookService.update(this.newBook).subscribe(() =>{
      this.bookService.message("Book updated successfully!","success")
    }, error =>{
      console.log(error)
      this.bookService.message("Book was not updated!","error");
    })
  }

  getBookInfos(id:string){
   this.bookService.findById(id).subscribe((resp)=>{
     this.bookForm.setValue({
            id:resp.id,
            name:resp.name,
            authors: resp.authors,
            pages: resp.pages,
            genres: resp.genres,
            publicationYear: resp.publicationYear,
            asin:resp.asin,
            summary:resp.summary,
            publisher: resp.publisher,
            bookCover: this.imgLinkDefault})

     this.imgLinkDefault = resp.bookCover!;
   });
    this.getMultiselectInfos()
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

  closeForm(){
    this.confirmationUpdate.confirm({
      message: 'Are you sure that you want cancel?',
      accept: () => {
        this.ref.close();
      }
    })
  }

  ngOnInit(){
   this.getBookInfos(this.config.data.id)
  }

}
