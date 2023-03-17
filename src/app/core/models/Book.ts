import {IAuthor} from "./Author";
import {IGenre} from "./Genre";
import {IPublisher} from "./Publisher";

export interface IBook{
  id?:string
  name:string
  authors?:IAuthor[]
  pages?:Date
  genres?:IGenre[]
  publicationYear?:unknown
  asin?:string
  summary?:string
  publisher?:IPublisher
  bookCover?:string
}


export class Book {
  id?:string
  name?:string
  authors?:IAuthor[]
  pages?:number
  genres?:IGenre[]
  publicationYear?:unknown
  asin?:string
  summary?:string
  publisher?:IPublisher
  bookCover?:string

  public constructor(init?: Partial<Book>) {
    Object.assign(this, init);
  }
}



