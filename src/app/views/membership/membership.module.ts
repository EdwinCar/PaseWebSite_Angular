import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MembershipRoutingModule } from './membership-routing.module';
import { BusinessComponent } from './business/business.component';
import { CreateCompanyComponent } from './create-company/create-company.component';


@NgModule({
  declarations: [BusinessComponent, CreateCompanyComponent],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class MembershipModule { }
