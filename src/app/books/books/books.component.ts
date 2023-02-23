import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit {

books: Book[] = [
  {_id:'1', name:'Aprendendo Angular', genre:'Suspense', author:'Bene'}
];
displayedColumns = ['id','name', 'genre', 'author'];

constructor() {
  // this.books = [];
};

ngOnInit(): void {
}

}
