import { OperationResponse } from './../../../services/shared/models/responses/operation-response';
import { Company } from './../../../services/shared/models/company';
import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/membership/business.service';
import { Parameter } from 'src/app/services/shared/models/parameter';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  company: Company = new Company();
  parameters: Array<Parameter> = [];
  conciliations: Array<Parameter> = [];
  operation: OperationResponse = new OperationResponse();
  constructor(private business: BusinessService) { }

  ngOnInit() {
    this.getCompanies();
    this.getConciliations();
  }

  getCompanies() {
    this.business.getParameters('GIRO_NEGOCIO', '').subscribe(
      result => {
        console.log('Categories', 'init');
        if (result.state === 0) {
          this.parameters = result.data;
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

  getConciliations() {
    this.business.getParameters('TCONSILIACION', '').subscribe(
      result => {
        console.log('Categories', 'init');
        if (result.state === 0) {
          this.conciliations = result.data;
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

  onRegister() {
    console.log('Register', this.company);
    this.business.addCompany(this.company).subscribe(
      result => {
        console.log('register', 'init');
        if (result.state === 0) {
          this.operation = result.data;
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
