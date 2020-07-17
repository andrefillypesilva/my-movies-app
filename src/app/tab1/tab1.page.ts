/*
// tab1.page.ts
// author: André Fillype (05/01/2019)
// desc: explore page
*/

import { Component } from '@angular/core';
import { MoviesService } from '../_shared/_services/movies.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [MoviesService]
})
export class Tab1Page {
  
  movies: any;
  search: string;
  show: boolean;
  urlApi: string;

  constructor(private _moviesService: MoviesService) {
    this.getMovies();
    this.urlApi = environment.urlApi;
  }

  // default function to get all movies
  getMovies() {
    this.show = false;
    this._moviesService.get('/movies')
      .then(res => {
        this.movies = JSON.parse(JSON.stringify(res));
      })
  }

  // function to search movies by key
  onKey(event: any) {
    this.search = event.target.value;

    if(this.search == '' || this.search == undefined) {
      this.getMovies();
    } else {
      this.show = true;
      this._moviesService.get('/movies/' + this.search)
        .then(res => {
          this.movies = JSON.parse(JSON.stringify(res));
        })
    }

  }

}
