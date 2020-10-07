import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class InvestmentService {

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get(`${environment.baseUrl}/investment`)
  }

  create(asset) {
    return this.http.post(`${environment.baseUrl}/investment`, asset)
  }
}
