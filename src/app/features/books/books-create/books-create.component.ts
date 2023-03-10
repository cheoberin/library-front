import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../shared/services/book/book.service";
import {Book, IBook} from "../../../core/models/book";
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {IAuthor} from "../../../core/models/Author";
import {IGenre} from "../../../core/models/Genre";
import {IPublisher} from "../../../core/models/Publisher";


@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.scss']
})
export class BooksCreateComponent implements OnInit{

  imgLinkDefault!: string;
  imgLink!: string;
  publishers!: IPublisher[];
  authors!: IAuthor[];
  genres!: IGenre[];
  private newBook!: Book;
  bookForm!: FormGroup;

  constructor(private service: BookService,private fb: FormBuilder ){

    this.authors = [
      {name: 'New York', id: 'NY'},
      {name: 'Rome', id: 'RM'},
      {name: 'London', id: 'LDN'},
      {name: 'Istanbul', id: 'IST'},
      {name: 'Paris', id: 'PRS'}
    ];

    this.genres = [
      {name: 'New York', id: 'NY'},
      {name: 'Rome', id: 'RM'},
      {name: 'London', id: 'LDN'},
      {name: 'Istanbul', id: 'IST'},
      {name: 'Paris', id: 'PRS'}
    ];

    this.publishers = [
      {name: 'New York', id: 'NY'},
      {name: 'Rome', id: 'RM'},
      {name: 'London', id: 'LDN'},
      {name: 'Istanbul', id: 'IST'},
      {name: 'Paris', id: 'PRS'}
    ];

    this.imgLinkDefault = environment.imageBase;

  }

  create(): void{
    if(this.bookForm.invalid){
      return;
    }
    this.newBook = new Book(this.bookForm.value)
    this.service.create(this.newBook).subscribe((resp) =>{
      this.service.message("Book created successfully!","success")
    }, error =>{
      console.log(error)
      this.service.message("Book was not created!","error");
    })
  }

  setCoverLink(){
    this.imgLinkDefault = this.imgLink;
  }

  ngOnInit() {
    this.bookForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      authors: ['',[Validators.required,Validators.minLength(1)]],
      pages: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
      genres: ['',[Validators.required,Validators.minLength(1)]],
      publicationYear: ['',[Validators.required]],
      asin:['',[Validators.required,Validators.minLength(10)]],
      summary:['',[Validators.required,Validators.minLength(15)]],
      publisher: ['',[Validators.required]],
      bookCover: ['',[Validators.required,Validators.minLength(5)]]
    })
  }
}
