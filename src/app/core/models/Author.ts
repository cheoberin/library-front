export interface IAuthor{
  id:string
  name:string
  birthDate?:unknown;
  description: string;
  nationality?:string;
  registerDate?:unknown;

}

export class Author {
  id!: string;
  name!: string;
  nationality!: string;
  description!: string;
  birthDate!: unknown;
  registerDate?: unknown;

  public constructor(init?: Partial<Author>) {
    Object.assign(this, init);
  }

}
