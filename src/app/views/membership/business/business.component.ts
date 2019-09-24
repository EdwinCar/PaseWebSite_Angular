import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Company } from './../../../services/shared/models/company';
import { BusinessService } from 'src/app/services/membership/business.service';
import { SearchBusinessResponse } from 'src/app/services/shared/models/responses/search-business-response';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  dataContext = new MatTableDataSource<Company>();
  displayedColumns: string[] = ['codigoEmpresa', 'razonSocial', 'ruc', 'giroNegocio', 'swActividad'];
  companies: SearchBusinessResponse = new SearchBusinessResponse();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private business: BusinessService, private router: Router) { }

  ngOnInit() {
    this.business.getAllBusiness('').subscribe(
      result => {
        console.log('Business: ', result);
        if (result.state === 0) {
          this.companies = result.data;
          this.dataContext.data = this.companies.companies;
          this.dataContext.paginator = this.paginator;
          console.log('Business: ', 'success');
        } else {
          console.log(result.message);
        }
      },
      error => {
        console.log(error.message);
      }
    );
  }

  ngCreateBusiness() {
    this.router.navigate(['/membership/create']);
  }
}
