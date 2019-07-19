import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';

import { HomeComponent } from './home/home.component';

import { DashboardService } from './dashboard.service';

@NgModule({
    declarations: [DashboardComponent, SidebarNavComponent, HomeComponent],
    imports: [
        DashboardRoutingModule,
        SharedModule
    ],
    providers: [DashboardService]
})
export class DashboardModule { }
