/*
// movies.service.ts
// author: André Fillype (05/01/2019)
// changed: (17/07/2020)
// desc: services for use with movies
*/

import { Injectable } from '@angular/core';
import { BrowserXhr, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Models
import { Movie } from './../../_models/movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BrowserXhr {

  constructor(private http: HttpClient) {
    super();
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Content-Type", "application/json");
    return headers;
  }

  // default function to call a GET request
  get(schema: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.urlApi}/${schema}`)
    .pipe(
      map((res: any) => {
        res.object.map(m => {
          m.category_name = m.category.name;
        });

        return res.object;
      })
    );
  }

  // default function to call a POST request
  post(schema: string, body: any): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${environment.urlApi}/${schema}`, body);
  }

}
