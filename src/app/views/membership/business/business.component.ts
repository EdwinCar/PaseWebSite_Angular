import { EditCompanyComponent } from './../edit-company/edit-company.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Company } from './../../../services/shared/models/company';
import { BusinessService } from 'src/app/services/membership/business.service';
import { SearchBusinessResponse } from 'src/app/services/shared/models/responses/search-business-response';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  dataContext = new MatTableDataSource<Company>();
  displayedColumns: string[] = ['codigoEmpresa', 'razonSocial', 'ruc', 'giroNegocio', 'swActividad', 'action'];
  companies: SearchBusinessResponse = new SearchBusinessResponse();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private business: BusinessService, private router: Router, public dialog: MatDialog) {}
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
    this.dataContext.sort = this.sort;
    this.business.getAllBusiness('').subscribe(
      result => {
        if (result.state === 0) {
          this.companies = result.data;
          this.dataContext.data = this.companies.companies;
          this.dataContext.paginator = this.paginator;
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

  onFilterTable(filterValue: string) {
    this.dataContext.filter = filterValue.trim().toLowerCase();
    if (this.dataContext.paginator) {
      this.dataContext.paginator.firstPage();
    }
  }

  onDialogModify(company: Company) {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      data: company,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Closed', 'dialog');
      console.log(result);
    });
  }

  onDialogDelete(codigoCompany: string) {
    this.business.deleteCompany(codigoCompany).subscribe(
      result => {
        if (result.state === 0) {
          console.log('result', result.data);
        } else {
          console.log(result.message);
        }
      },
      error => {
        console.log(error.message);
      }
    );
  }
}
