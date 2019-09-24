import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
  private config: any = null;

  constructor(private client: HttpClient) {}

  getConfig(key: any) {
    return this.config[key];
  }

  loadConfig() {
    return this.client.get('/config/config.prod.json')
    .toPromise()
    .then(data => {
      this.config = data;
    })
    .catch(error => {
      console.log('Config: ', error);
    });
  }
}
