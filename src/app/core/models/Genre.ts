export interface IGenre {
  _id:string
  name:string
  description?:string
}

export class Genre{
  _id!:string
  name!:string
  description?:string
  public constructor(init?: Partial<Genre>) {
    Object.assign(this, init);
  }
}
