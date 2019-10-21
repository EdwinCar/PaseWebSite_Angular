import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Company } from 'src/app/services/shared/models/company';
import { Parameter } from 'src/app/services/shared/models/parameter';
import { OperationResponse } from 'src/app/services/shared/models/responses/operation-response';
import { BusinessService } from 'src/app/services/membership/business.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  company: Company = new Company();
  parameters: Array<Parameter> = [];
  conciliations: Array<Parameter> = [];
  operation: OperationResponse = new OperationResponse();
  active = 'Habilitar';

  swith = false;

  // tslint:disable-next-line: max-line-length
  constructor(private business: BusinessService, public dialogRef: MatDialogRef<EditCompanyComponent>, @Inject(MAT_DIALOG_DATA) public data: Company) {
    this.company = data;
  }

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

  onModify() {
    this.business.updateCompany(this.company).subscribe(
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

  onClose() {
    this.dialogRef.close();
  }

  onToggle(event: MatSlideToggleChange) {
    if (event.checked) {
      this.active = 'Habilitar';
    } else {
      this.active = 'Deshabilitar';
    }
  }
}
