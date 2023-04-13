import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
  constructor(private authService:AuthService) {}

  logout(){
    this.authService.doLogout();
  }
}
