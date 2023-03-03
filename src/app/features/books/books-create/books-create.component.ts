import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';


interface Author {
  name: string,
  id: string
}

interface Publisher {
  name: string,
  id: string
}

interface Genre {
  name: string,
  id: string
}


@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.scss']
})
export class BooksCreateComponent implements OnInit{

  imgLinkDefault!: string;
  imgLink!: string;

  publishers!: Publisher[];
  authors!: Author[];
  genres!: Genre[];
  value4!: number;
  date10!: Date;

  selectedAuthors!: Author[];
  selectedGenres!: Genre[];
  selectedPublishers!: Publisher;


  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig){
    
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
    
    this.imgLinkDefault = "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg";
    
  }

  setCoverLink(){
    this.imgLinkDefault = this.imgLink;
  }

  ngOnInit(): void {}


}
