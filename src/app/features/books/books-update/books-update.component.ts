import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {BookService} from "../../../shared/services/book/book.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book, IBook} from "../../../core/models/book";
import {IPublisher} from "../../../core/models/Publisher";
import {IAuthor} from "../../../core/models/Author";
import {IGenre} from "../../../core/models/Genre";
import {environment} from "../../../../environments/environment";



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
             private config: DynamicDialogConfig){

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
   this.service.findbyId(id).subscribe((resp)=>{

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

  setCoverLink(){
    this.imgLinkDefault = this.imgLink;

    this.bookForm.patchValue({
      bookCover: this.imgLinkDefault
    })

  }

  ngOnInit(){
   this.getBookInfos(this.config.data.id)
  }

}
