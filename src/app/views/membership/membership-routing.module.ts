import { CreateCompanyComponent } from './create-company/create-company.component';
import { BusinessComponent } from './business/business.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'business', component: BusinessComponent},
  { path: 'create', component: CreateCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }
