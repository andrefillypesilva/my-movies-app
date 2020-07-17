/*
// movies.service.ts
// author: André Fillype (05/01/2019)
// changed: (17/07/2020)
// desc: services for use with movies
*/

import { Injectable } from '@angular/core';
import { Http, BrowserXhr, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BrowserXhr {

  constructor(private http: Http) {
    super();
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Content-Type", "application/json");
    return headers;
  }

  // default function to call a GET request
  get(schema: string): Promise<any[]> {
    let headers = this.getHeaders();

    return Promise.resolve(this.http.get(environment.urlApi + schema, { headers: headers })
      .toPromise()
      .then((res) => {
        console.log(JSON.parse(res.text()));
        return JSON.parse(res.text());
      })
      .catch((res) => {
        return [];
      }));
  }

  // default function to call a POST request
  post(schema: string, body: any): Promise<any[]> {
    let headers = this.getHeaders();

    return Promise.resolve(this.http.post(environment.urlApi + schema, body, { headers: headers })
      .toPromise()
      .then((res) => {
        console.log(JSON.parse(res.text()));
        return JSON.parse(res.text());
      })
      .catch((res) => {
        console.log('error');
        return [];
      }));
  }

}
