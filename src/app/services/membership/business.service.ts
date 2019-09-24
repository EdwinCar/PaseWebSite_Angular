import { Company } from './../shared/models/company';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/app.config';
import { Observable } from 'rxjs';
import { IResponse } from '../shared/models/iresponse';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private baseUrl = this.config.getConfig('BaseUrl');

  constructor(private config: AppConfigService, private client: HttpClient) { }

  getAllBusiness(searchs: string): Observable<IResponse> {
    const current = {
      search: searchs
    };
    return this.client.post<IResponse>(this.baseUrl + 'membership/business/search', current);
  }

  getParameters(name: string, value: string): Observable<IResponse> {
    const parameter = {
      Name: name,
      Paremeter: value
    };
    return this.client.post<IResponse>(this.baseUrl + 'membership/parameters', parameter);
  }

  addCompany(company: Company): Observable<IResponse> {
    return this.client.post<IResponse>(this.baseUrl + 'business/insert', company);
  }

  updateCompany(company: Company): Observable<IResponse> {
    return this.client.post<IResponse>(this.baseUrl + 'business/update', company);
  }

  deleteCompany(companyCode: string): Observable<IResponse> {
    const company = {
      CompanyCode: companyCode
    };
    return this.client.post<IResponse>(this.baseUrl + 'business/delete', company);
  }
}
