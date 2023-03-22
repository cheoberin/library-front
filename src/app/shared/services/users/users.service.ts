import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {IUsers, Users} from "../../../core/models/Users";
import {IRoles} from "../../../core/models/Roles";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,
              private messageServ: MessageService) { }

  findByUsername(username:string):Observable<IUsers>{
    const url = this.baseUrl + `/user/getUser/${username}`;
    return this.http.get<IUsers>(url);
  }
  findAllUsers(): Observable<IUsers[]>{
    const url = this.baseUrl + "/user/list";
    return this.http.get<IUsers[]>(url);
  }
  create(user: IUsers): Observable<IUsers>{
    const url = this.baseUrl + "/user/save";
    return this.http.post<IUsers>(url, user);
  }

  findById(id:string):Observable<IUsers>{
    const url = this.baseUrl + `/user/${id}`;
    return this.http.get<IUsers>(url);
  }

  update(user: Users): Observable<Users>{
    const url = this.baseUrl + "/user";
    return this.http.put<Users>(url, user);
  }

  addRoletoUser(formRoletoUser:Object):Observable<IUsers>{
    const url = this.baseUrl + "user/role/addtouser";
    return this.http.post<IUsers>(url,formRoletoUser);
  }
  createRole(role: IRoles): Observable<IRoles>{
    const url = this.baseUrl + "/user/role/save";
    return this.http.post<IRoles>(url, role);
  }

  findAllRoles(): Observable<IRoles[]>{
    const url = this.baseUrl + "/user/role/listRoles";
    return this.http.get<IRoles[]>(url);
  }
  deleteUser(userName:string):Observable<any> {
    const url = this.baseUrl + `/user/delete/${userName}`;
    return this.http.delete(url)
  }
  deleteRole(roleName:string):Observable<any> {
    const url = this.baseUrl + `user/role/delete/${roleName}`;
    return this.http.delete(url)
  }

  message(msg: string, severity :string):void{
    this.messageServ.add({
      severity:`${severity}`,
      summary:`${msg}`
    })
  }
}
