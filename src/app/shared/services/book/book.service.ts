import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Book, IBook} from 'src/app/core/models/book';
import { environment } from 'src/environments/environment';


import {MessageService} from "primeng/api";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient,
              private messageServ: MessageService) { }


  findById(id:string):Observable<IBook>{
    const url = this.baseUrl + `/book/` + id;
    return this.http.get<IBook>(url);
  }
  findAll(): Observable<IBook[]>{
    const url = this.baseUrl + "/book";
    return this.http.get<IBook[]>(url);
  }
  create(book: Book): Observable<Book>{
    const url = this.baseUrl + "/book";
    return this.http.post<Book>(url, book);
  }
  update(book: Book): Observable<Book>{
    const url = this.baseUrl + "/book";
    return this.http.put<Book>(url, book);
  }
  message(msg: string, severity :string):void{
    this.messageServ.add({
      severity:`${severity}`,
      summary:`${msg}`
    })
  }
}
