import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Models
import { Movie } from './../../_models/movie';

// Services
import { MoviesService } from './../_services/movies.service';

@Injectable({ providedIn: 'root' })
export class MoviesResolver implements Resolve<Movie[]> {

  constructor(private _moviesService: MoviesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Movie[]> {
    return this._moviesService.get('movies');
  }
}