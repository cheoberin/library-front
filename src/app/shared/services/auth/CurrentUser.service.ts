import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('current_user') || '{}'));

  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor() { }

  public setCurrentUser(user: any): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public getInitials(): Observable<string> {
    return this.currentUser$.pipe(
      map(user => user && user.name ? user.name.substring(0, 2).toUpperCase() : '')
    );
  }
}

