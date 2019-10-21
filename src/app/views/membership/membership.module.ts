import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MembershipRoutingModule } from './membership-routing.module';
import { BusinessComponent } from './business/business.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { MenuServiceComponent } from './services/menu-service/menu-service.component';


@NgModule({
  declarations: [BusinessComponent, CreateCompanyComponent, EditCompanyComponent, MenuServiceComponent],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    EditCompanyComponent
  ]
})
export class MembershipModule { }
