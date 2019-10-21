import { MenuServiceComponent } from './services/menu-service/menu-service.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { BusinessComponent } from './business/business.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'business', component: BusinessComponent },
  { path: 'create', component: CreateCompanyComponent },
  { path: 'edit', component: EditCompanyComponent },
  { path: 'services', component: MenuServiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule {}
