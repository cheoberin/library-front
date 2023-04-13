export interface IPublisher{
  _id:string
  name:string

  description?:string
}

export class Publisher{
  _id!:string
  name!:string
  description?:string

  public constructor(init?: Partial<Publisher>) {
    Object.assign(this, init);
  }
}
