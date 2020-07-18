/*
// pipe-module.module.ts
// author: André Fillype (06/01/2019)
// desc: module to join pipes
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupByMoviePipe } from './pipe-module/movie-pipe/group-by-movie.pipe';

@NgModule({
  declarations: [GroupByMoviePipe],
  imports: [
    CommonModule
  ],
  exports: [GroupByMoviePipe]
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
