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
        FeaturesModule,
        ReactiveFormsModule
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
