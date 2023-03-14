import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {IGenre} from "../../../core/models/Genre";


@Injectable({
  providedIn: 'root'
})
export class GenresService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,
              private messageServ: MessageService) { }


  findById(id:string):Observable<IGenre>{
    const url = this.baseUrl + `/genre/` + id;
    return this.http.get<IGenre>(url);
  }
  findAll(): Observable<IGenre[]>{
    const url = this.baseUrl + "/genre";
    return this.http.get<IGenre[]>(url);
  }
  create(genre: IGenre): Observable<IGenre>{
    const url = this.baseUrl + "/genre";
    return this.http.post<IGenre>(url, genre);
  }
  update(genre: IGenre): Observable<IGenre>{
    const url = this.baseUrl + "/genre";
    return this.http.put<IGenre>(url, genre);
  }
  delete():Observable<any> {
    const url = this.baseUrl + `/genre/`;
    return this.http.delete(url)
  }

  message(msg: string, severity :string):void{
    this.messageServ.add({
      severity:`${severity}`,
      summary:`${msg}`
    })
  }
}
