import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { SideNavService } from '../shared/services/side-nav/side-nav.service';
import { FeaturesModule } from '../features/features.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { LoginComponent } from './components/login/login.component';
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {InputText, InputTextModule} from "primeng/inputtext";
import {MenuModule} from "primeng/menu";
import {AvatarModule} from "primeng/avatar";


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    ButtonModule,
    SidebarModule,
    ToolbarModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    FeaturesModule,
    ReactiveFormsModule,
    MatButtonModule,
    CheckboxModule,
    RippleModule,
    InputTextModule,
    MenuModule,
    AvatarModule
  ],
  exports:[
    HeaderComponent,
    SidenavComponent,
    FooterComponent
  ],
  providers:[
    SideNavService,
  ]
})
export class CoreModule { }
