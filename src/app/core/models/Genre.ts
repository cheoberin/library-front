export interface IGenre {
  id:string
  name:string
}

export class Genre{
  id!:string
  name!:string
  public constructor(init?: Partial<Genre>) {
    Object.assign(this, init);
  }
}
