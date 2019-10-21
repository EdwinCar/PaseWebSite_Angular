import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrizationRoutingModule } from './parametrization-routing.module';
import { MenuMaintenanceComponent } from './maintenance/menu-maintenance/menu-maintenance.component';


@NgModule({
  declarations: [MenuMaintenanceComponent],
  imports: [
    CommonModule,
    ParametrizationRoutingModule
  ]
})
export class ParametrizationModule { }
