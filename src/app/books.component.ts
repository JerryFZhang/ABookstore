import { Component } from '@angular/core';

@Component({
  selector: 'books-ele',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class Books {
    books = [{'name':'Windstorm','src':'/assets/1.jpg', "rating":"5","author":"Default Author", "book-link":"b-1.html", "author-link":"a-1.html"}];

    book = this.books[0];

    constructor() {
    this.book = {'name':'Default','src':'0', "rating":"5", "author":"Default Author", "book-link":"b-1","author-link":"a-1"};
  }
 
}

