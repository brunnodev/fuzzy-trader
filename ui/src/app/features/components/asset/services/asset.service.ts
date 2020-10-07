import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AssetService {

  constructor(private http: HttpClient) { }

  load(valueToInvest) {
    return this.http.get(`${environment.baseUrl}/asset?valueToInvest=${valueToInvest}`)
  }
}
