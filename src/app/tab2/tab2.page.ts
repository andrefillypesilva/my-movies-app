/*
// tab2.page.ts
// author: André Fillype (05/01/2019)
// desc: new movie page
*/

import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../_shared/_services/movies.service';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { Movie } from '../_models/movie';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [MoviesService]
})

export class Tab2Page implements OnInit {

  movieForm: FormGroup;
  movieObj: Movie;
  categories: any;
  fileToUpload: File = null;

  constructor(
    private _moviesService: MoviesService,
    private http: Http,
    private _formBuilder: FormBuilder
  ) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.movieForm = this._formBuilder.group({
      name: ['', Validators.required],
      category_name: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  // function to create a new movie
  onSave() {
    // this.uploadFile();

    if (this.movieForm.valid && this.movieForm.dirty) {
      this.movieObj = Object.assign({}, this.movieObj, this.movieForm.value);

      this._moviesService.post('movies', this.movieObj)
        .subscribe(res => {
          this.movieForm.reset();
          alert('Filme adicionado com sucesso!');
        }, err => console.log(err));
    }
  }

  // default function to get all categories
  getCategories() {
    this._moviesService.getCategories('categories')
      .subscribe(res => {
        this.categories = res;
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
