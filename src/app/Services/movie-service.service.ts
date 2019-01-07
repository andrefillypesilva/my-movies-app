import { Injectable } from '@angular/core';
import { Http, BrowserXhr, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService extends BrowserXhr {

  constructor(private http: Http) {
    super();
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Content-Type", "application/json");
    return headers;
  }

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

  // upload(schema: string, body: any) {
  //   let headers = this.getHeaders();

  //   console.log(body);

  //   const formData: any = new FormData();

  //   formData.append("image", body, body.name);

  //   return Promise.resolve(this.http.post(environment.urlApi + schema, formData, { headers: headers })
  //     .toPromise()
  //     .then((res) => {
  //       console.log(res);
  //       return JSON.parse(res.text());
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //       return [];
  //     }));
  // }
}
