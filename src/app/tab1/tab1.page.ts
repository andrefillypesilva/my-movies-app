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
  show: boolean;

  constructor(private Services: MovieServiceService) {
    this.getMovies();
  }

  getMovies() {
    this.show = false;
    this.Services.get('/movies')
      .then(res => {
        this.movies = JSON.parse(JSON.stringify(res));
      })
  }

  onKey(event: any) {
    this.search = event.target.value;

    if(this.search == '' || this.search == undefined) {
      this.getMovies();
    } else {
      this.show = true;
      this.Services.get('/movies/' + this.search)
        .then(res => {
          this.movies = JSON.parse(JSON.stringify(res));
        })
    }

  }

}
