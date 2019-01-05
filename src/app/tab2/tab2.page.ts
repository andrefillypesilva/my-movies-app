import { Component } from '@angular/core';

export interface movie { id: string, img: string, name: string, category: string, duration: string }

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  movie_obj: movie;

  constructor() {
    this.movie_obj = {
      id: "",
      img: "",
      name: "",
      category: "",
      duration: ""
    }
  }

  create(form_directive) {
    let obj = JSON.parse(JSON.stringify(form_directive.value));

    this.movie_obj.name = obj.name;
    this.movie_obj.category = obj.category;
    this.movie_obj.duration = obj.duration;

    console.log(this.movie_obj);
  }
}
