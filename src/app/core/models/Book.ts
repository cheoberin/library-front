import {IAuthor} from "./Author";
import {IGenre} from "./Genre";
import {IPublisher} from "./Publisher";

export interface IBook{
  _id?:string
  name:string
  authors?:IAuthor[]
  pages?:Date
  genres?:IGenre[]
  publicationYear?:unknown
  asin?:string
  summary?:string
  publisher?:IPublisher
  publisherResponse?:IPublisher
  bookCover?:string
  price?:number
}


export class Book {
  _id?:string
  name?:string
  authors?:IAuthor[]
  pages?:number
  genres?:IGenre[]
  publicationYear?:unknown
  asin?:string
  summary?:string
  publisher?:IPublisher
  publisherResponse?:IPublisher
  bookCover?:string
  price?:number

  public constructor(init?: Partial<Book>) {
    Object.assign(this, init);
  }
}



