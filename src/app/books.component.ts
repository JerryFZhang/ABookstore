import { Component } from '@angular/core';

@Component({
  selector: 'books-ele',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class Books {
    books = [{'name':'Windstorm','src':'/assets/1.jpg', "rating":"5"},{'name':'Bombasto','src':'2.jpg', "rating":"2"},{'name':'Magneta','src':'3.jpg', "rating":"4"},{'name':'Tornado','src':'4.jpg', "rating":"4"}];

    book = this.books[0];

    constructor() {
    this.book = {'name':'Default','src':'0', "rating":"5"};
  }
 
}

