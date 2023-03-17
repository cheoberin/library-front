export interface IPublisher{
  id:string
  name:string
}

export class Publisher{
  id!:string
  name!:string

  public constructor(init?: Partial<Publisher>) {
    Object.assign(this, init);
  }
}
