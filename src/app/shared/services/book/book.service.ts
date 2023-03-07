import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/models/book';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient) { }


  findAll(): Observable<Book[]>{
    const url = this.baseUrl + "/book";
    return this.http.get<Book[]>(url);
  }

}
