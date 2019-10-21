import { Category } from './../../../../services/shared/models/category';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceCustomer } from 'src/app/services/shared/models/service-customer';
import { SearchServiceResponse } from 'src/app/services/shared/models/responses/search-service-response';
import { BusinessService } from 'src/app/services/membership/business.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Company } from 'src/app/services/shared/models/company';

@Component({
  selector: 'app-menu-service',
  templateUrl: './menu-service.component.html',
  styleUrls: ['./menu-service.component.css']
})
export class MenuServiceComponent implements OnInit {
  dataContext = new MatTableDataSource<ServiceCustomer>();
  searchServiceResponse: SearchServiceResponse = new SearchServiceResponse();
  categories: Array<Category> = [];
  companies: Array<Company> = [];
  displayedColumns: string[] = [
    'codigoEmpresa',
    'razonSocial',
    'codServicio',
    'nombreServicio',
    'rubro',
    'tipoPago',
    'modoValidacion',
    'cuentaRecudadora',
    'cuentaMoneda'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private business: BusinessService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
    this.dataContext.sort = this.sort;
    this.business.getAllCompanyServices().subscribe(
      result => {
        if (result.state === 0) {
          this.searchServiceResponse = result.data;
          this.categories = this.searchServiceResponse.categories;
          for (let cat of this.categories) {
            console.log(cat);
          }
          // this.dataContext.data = this.categories.Categories;
          // this.dataContext.paginator = this.paginator;
        } else {
          console.log(result.message);
        }
      },
      error => {
        console.log(error.message);
      }
    );
  }

  selectedCategory($event) {
    console.log($event.value);
    let code = '07';
    let catego = this.categories.filter(x => x.CategoryCode === code);


    this.companies = this.categories[1].Companies;
  }

  ngCreateService() {}

  onDialogModify() {}

  onDialogDelete() {}
}
