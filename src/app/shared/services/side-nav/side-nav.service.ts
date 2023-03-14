import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';

@Injectable()
export class SideNavService {

  constructor() {}
  public sideNavToggleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public toggle() {
    return this.sideNavToggleSubject.next(!this.sideNavToggleSubject.value)
  }

}
