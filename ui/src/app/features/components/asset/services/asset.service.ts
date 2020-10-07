import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AssetService {

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get(`${environment.baseUrl}/asset`)
  }
}
