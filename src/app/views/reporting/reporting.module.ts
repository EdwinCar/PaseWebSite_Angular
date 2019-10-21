import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { MenuTransactionComponent } from './transactions/menu-transaction/menu-transaction.component';


@NgModule({
  declarations: [MenuTransactionComponent],
  imports: [
    CommonModule,
    ReportingRoutingModule
  ]
})
export class ReportingModule { }
