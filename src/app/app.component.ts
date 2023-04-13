import { Component } from '@angular/core';
import {AuthService} from "./shared/services/auth/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-jwba';

  constructor(public authService:AuthService) {}
  ;


}
