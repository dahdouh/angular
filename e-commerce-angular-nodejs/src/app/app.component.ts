import {Component, OnInit} from '@angular/core';
import {PanierService} from './services/panier.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Karim Dahdouh';
  dateNow = new Date();

}
