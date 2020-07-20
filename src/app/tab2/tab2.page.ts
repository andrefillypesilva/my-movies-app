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

  file: File;
  formData: FormData = new FormData();
  movieForm: FormGroup;
  movieObj: Movie;
  categories: any;
  fileToUpload: File = null;

  constructor(
    private _moviesService: MoviesService,
    private http: Http,
    private _formBuilder: FormBuilder
  ) {
    this.createMovieObject();
    this.getCategories();
  }

  ngOnInit(): void {
    this.movieForm = this._formBuilder.group({
      name: ['', Validators.required],
      category_name: ['', Validators.required],
      duration: ['', Validators.required],
      img: ['']
    });
  }

  createMovieObject(): void {
    this.movieObj = {
      _id: '',
      category_name: '',
      duration: 0,
      name: '',
      img: '',
      category: null
    };
  }

  // function to create a new movie
  onSave() {
    this.validateFields();

    if (this.movieForm.valid && this.movieForm.dirty) {
      this.movieObj = Object.assign({}, this.movieObj, this.movieForm.value);

      this._moviesService.post('movies', this.movieObj)
        .subscribe(res => {
          this._moviesService.upload(this.formData, res.object)
            .subscribe(res => {
              alert('Filme adicionado com sucesso!');
              this.movieForm.reset();
            }, err => {
              alert(res.message);
              console.log(err);
            });
        }, err => {
          alert(err['error']['message']);
          console.log(err);
        });
    }
  }

  validateFields(): void {
    (<any>Object).values(this.movieForm.controls).forEach(control => {
      control.markAsDirty();
    });
  }

  // default function to get all categories
  getCategories() {
    this._moviesService.getCategories('categories')
      .subscribe(res => {
        this.categories = res;
      })
  }

  // function to upload file
  onChange(event): void {
    const files: FileList = <FileList>event.target.files;

    if (files[0]) {
      this.file = files[0];
      this.movieForm.value.img = this.file.name;

      this.formData.append('img', this.file, this.file.name);
    }
  }

}
