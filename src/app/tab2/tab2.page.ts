/*
// tab2.page.ts
// author: André Fillype (05/01/2019)
// desc: new movie page
*/

import { Component } from '@angular/core';
import { MovieServiceService } from '../Services/movie-service.service';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

export interface movie { id: string, img: string, name: string, category: string, duration: string }

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [MovieServiceService]
})

export class Tab2Page {

  movie_obj: movie;
  categories: any;
  fileToUpload: File = null;

  constructor(private Services: MovieServiceService, private http: Http) {
    this.movie_obj = {
      id: "",
      img: "",
      name: "",
      category: "",
      duration: ""
    }

    this.getCategories();
  }

  // function to create a new movie
  create(form_directive) {
    this.uploadFile();
    let obj = JSON.parse(JSON.stringify(form_directive.value));

    this.movie_obj.name = obj.name;
    this.movie_obj.category = obj.category;
    this.movie_obj.duration = obj.duration;
    this.movie_obj.img = this.fileToUpload.name;
    
    this.Services.post('/movies', this.movie_obj)
      .then(res => {
        form_directive.reset();
        alert('Filme adicionado com sucesso!');
      })
      .catch(err => {
        console.log(err);
      });
  }

  // default function to get all categories
  getCategories() {
    this.Services.get('/category')
      .then(res => {
        this.categories = JSON.parse(JSON.stringify(res));
      })
  }

  // function to prepare file to upload
  prepareFileUpload(file: any) {
    this.fileToUpload = file.target.files[0];
  }

  // function to upload file
  uploadFile() {
    const formData: any = new FormData();

    formData.append("image", this.fileToUpload, this.fileToUpload.name);

    this.http.post(environment.urlApi + '/upload', formData)
        .pipe(map(file => file.json()))
        .subscribe(file => console.log('file', file))
  }
  
}
