export interface IAuthor{
  _id:string
  name:string
  birthDate?:unknown;
  description: string;
  nationality?:string;

}

export class Author {
  _id!: string;
  name!: string;
  nationality!: string;
  description!: string;
  birthDate!: unknown;


  public constructor(init?: Partial<Author>) {
    Object.assign(this, init);
  }

}
