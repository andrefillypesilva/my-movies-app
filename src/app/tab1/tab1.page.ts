import { Component } from '@angular/core';
import { MovieServiceService } from '../Services/movie-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [MovieServiceService]
})
export class Tab1Page {
  
  movies: any;
  search: string;

  constructor(private Services: MovieServiceService) {
    this.getMovies();
  }

  getMovies() {
    this.Services.get('/movies')
      .then(res => {
        this.movies = JSON.parse(JSON.stringify(res));
      })
  }

  onKey(event: any) {
    this.search = event.target.value;

    this.Services.get('/movies/' + this.search)
      .then(res => {
        this.movies = JSON.parse(JSON.stringify(res));
      })
  }

}
