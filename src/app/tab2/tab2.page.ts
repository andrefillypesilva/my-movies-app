import { Component } from '@angular/core';
import { MovieServiceService } from '../Services/movie-service.service';

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

  constructor(private Services: MovieServiceService) {
    this.movie_obj = {
      id: "",
      img: "",
      name: "",
      category: "",
      duration: ""
    }

    this.getCategories();
  }

  create(form_directive) {
    let obj = JSON.parse(JSON.stringify(form_directive.value));

    this.movie_obj.name = obj.name;
    this.movie_obj.category = obj.category;
    this.movie_obj.duration = obj.duration;
    
    this.Services.post('/movies', this.movie_obj)
      .then(res => {
        form_directive.reset();
        alert('Filme adicionado com sucesso!');
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCategories() {
    this.Services.get('/category')
      .then(res => {
        this.categories = JSON.parse(JSON.stringify(res));
      })
  }
  
}
