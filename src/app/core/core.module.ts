import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

import { AppRoutingModule } from '../app-routing.module';
import { FeaturesModule } from '../features/features.module';
import { SideNavService } from '../shared/services/side-nav/side-nav.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent
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
    FeaturesModule
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
