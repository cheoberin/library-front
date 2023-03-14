import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {IAuthor} from "../../../core/models/Author";


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,
              private messageServ: MessageService) { }


  findById(id:string):Observable<IAuthor>{
    const url = this.baseUrl + `/author/${id}` ;
    return this.http.get<IAuthor>(url);
  }
  findAll(): Observable<IAuthor[]>{
    const url = this.baseUrl + "/author";
    return this.http.get<IAuthor[]>(url);
  }
  create(author: IAuthor): Observable<IAuthor>{
    const url = this.baseUrl + "/author";
    return this.http.post<IAuthor>(url, author);
  }
  update(author: IAuthor): Observable<IAuthor>{
    const url = this.baseUrl + "/author";
    return this.http.put<IAuthor>(url, author);
  }
  delete(id:string):Observable<any> {
    const url = this.baseUrl + `/author/${id}`;
    return this.http.delete(url)
  }

  message(msg: string, severity :string):void{
    this.messageServ.add({
      severity:`${severity}`,
      summary:`${msg}`
    })
  }
}
