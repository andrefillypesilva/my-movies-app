/*
// tab1.page.ts
// author: André Fillype (05/01/2019)
// desc: explore page
*/

import { Component } from '@angular/core';
import { MoviesService } from '../_shared/_services/movies.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private _moviesService: MoviesService,
    private _route: ActivatedRoute,
  ) {
    this.getMovies();
    this.urlApi = environment.urlApi;
  }

  // default function to get all movies
  getMovies() {
    this.movies = this._route.snapshot.data['movies'];
  }

  // function to search movies by key
  onKey(event: any) {
    this.search = event.target.value;

    if(this.search == '' || this.search == undefined) {
      this.getMovies();
    } else {
      this.show = true;
      this._moviesService.get('/movies/' + this.search)
      .subscribe(result => this.movies = result);
    }

  }

}
