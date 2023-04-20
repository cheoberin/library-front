import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/shared/services/side-nav/side-nav.service';
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  constructor(private sideNavService: SideNavService,public authService:AuthService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.sideNavService.sideNavToggleSubject.subscribe((resp)=> {
      this.sidenav.toggle(resp);
    });
  }
}
