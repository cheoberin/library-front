import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {IPublisher} from "../../../core/models/Publisher";


@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,
              private messageServ: MessageService) { }


  findById(id:string):Observable<IPublisher>{
    const url = this.baseUrl + `/publisher/` + id;
    return this.http.get<IPublisher>(url);
  }
  findAll(): Observable<IPublisher[]>{
    const url = this.baseUrl + "/publisher";
    return this.http.get<IPublisher[]>(url);
  }
  create(publisher: IPublisher): Observable<IPublisher>{
    const url = this.baseUrl + "/publisher";
    return this.http.post<IPublisher>(url, publisher);
  }
  update(publisher: IPublisher): Observable<IPublisher>{
    const url = this.baseUrl + "/publisher";
    return this.http.put<IPublisher>(url, publisher);
  }
  delete():Observable<any> {
    const url = this.baseUrl + `/publisher/`;
    return this.http.delete(url)
  }

  message(msg: string, severity :string):void{
    this.messageServ.add({
      severity:`${severity}`,
      summary:`${msg}`
    })
  }
}
