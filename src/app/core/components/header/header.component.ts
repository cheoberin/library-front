import {AfterViewInit, Component, OnInit} from '@angular/core';
import { SideNavService } from 'src/app/shared/services/side-nav/side-nav.service';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CurrentUserService} from "../../../shared/services/auth/CurrentUser.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  initials!: string;
  constructor(private sidenav: SideNavService,
              private authService: AuthService,
              public router: Router,
              private currentUserService:CurrentUserService) {

  }


  ngOnInit() {
    this.currentUserService.getInitials().subscribe(initials => {
      this.initials = initials;
    });
    this.items = [
      {
        label: 'Show Profile',
        icon: 'pi pi-external-link',
        command: () => {

        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-times',
        command: () => {
          this.authService.doLogout();
        }
      }
    ];
  }

  clickMenu() {
    this.sidenav.toggle();
  }



}
