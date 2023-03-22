import {IRoles} from "./Roles";

export interface IUsers{
  _id:string
  name:string
  username:string
  password?:string
  roles:IRoles[]
}

export class Users{
  _id!:string
  name!:string
  username!:string
  password!:string
  roles!:IRoles[]
  public constructor(init?: Partial<Users>) {
    Object.assign(this, init);
  }

}
