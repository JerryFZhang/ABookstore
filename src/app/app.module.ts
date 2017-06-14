import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { Books } from './books.component'

@NgModule({
  declarations: [
    AppComponent, 
      Books
  ],
  imports: [
   NgbModule.forRoot(),
      BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, Books]
})
export class AppModule { }
