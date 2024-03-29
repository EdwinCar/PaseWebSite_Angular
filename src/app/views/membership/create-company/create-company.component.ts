import { OperationResponse } from './../../../services/shared/models/responses/operation-response';
import { Company } from './../../../services/shared/models/company';
import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/membership/business.service';
import { Parameter } from 'src/app/services/shared/models/parameter';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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
  activeLabel = 'Habilitar';
  constructor(private business: BusinessService) { }

  ngOnInit() {
    this.getCompanies();
    this.getConciliations();
  }

  getCompanies() {
    this.business.getParameters('GIRO_NEGOCIO', '').subscribe(
      result => {
        if (result.state === 0) {
          this.parameters = result.data;
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
        if (result.state === 0) {
          this.conciliations = result.data;
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
    var code = this.parameters.filter(x => this.company.giroNegocio === x.value);

    this.business.addCompany(this.company).subscribe(
      result => {
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

  onToggle(event: MatSlideToggleChange) {
    if (event.checked) {
      this.activeLabel = 'Habilitar';
    } else {
      this.activeLabel = 'Deshabilitar';
    }
  }
}
