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


@Component({
  selector: 'app-books-update',
  templateUrl: './books-update.component.html',
  styleUrls: ['./books-update.component.scss']
})
export class BooksUpdateComponent implements OnInit {
  imgLinkDefault: string = environment.imageBase;
  imgLink!: string;
  publishers!: IPublisher[];
  authors!: IAuthor[];
  genres!: IGenre[];

  private newBook!: Book;

  book!: IBook;
  bookForm!: FormGroup;

 constructor(private service: BookService, private fb: FormBuilder,
             private config: DynamicDialogConfig,public ref: DynamicDialogRef,
             private confirmation: ConfirmationService){

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
    this.confirmation.confirm({
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
    this.service.update(this.newBook).subscribe((resp) =>{
      this.service.message("Book updated successfully!","success")
    }, error =>{
      console.log(error)
      this.service.message("Book was not updated!","error");
    })

  }

  getBookInfos(id:string){
   this.service.findById(id).subscribe((resp)=>{

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
     this.authors = resp.authors!;
     this.genres = resp.genres!;
     this.publishers = Array.of(resp.publisher!);
     })
  }

  closeForm(){
    this.confirmation.confirm({
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
