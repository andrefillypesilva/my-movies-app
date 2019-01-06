import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviePipePipe } from '../movie-pipe.pipe';

@NgModule({
  declarations: [MoviePipePipe],
  imports: [
    CommonModule
  ],
  exports: [MoviePipePipe]
})
export class PipeModuleModule {
  static forRoot() {
    return {
      ngModule: PipeModuleModule,
      providers: [],
    };
  }
}
