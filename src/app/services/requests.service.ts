import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_SERVER } from '../Constant';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(API_SERVER + url);
  }

  post(url: string, data: any) {
    return this.http.post(API_SERVER + url, data);
  }

  put(url: string, data: any) {
    return this.http.put(API_SERVER + url, data);
  }

  delete(url: string) {
    return this.http.delete(API_SERVER + url);
  }
}
