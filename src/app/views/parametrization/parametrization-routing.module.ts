import { MenuMaintenanceComponent } from './maintenance/menu-maintenance/menu-maintenance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'maintenance', component: MenuMaintenanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizationRoutingModule { }
