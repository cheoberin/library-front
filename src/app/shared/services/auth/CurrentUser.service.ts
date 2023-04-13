import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor() { }

  public setCurrentUser(user: any): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
