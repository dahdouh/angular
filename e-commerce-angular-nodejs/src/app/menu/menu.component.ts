import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../models/User.model';
import {Router} from '@angular/router';
import {PanierService} from '../services/panier.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser: User;


  constructor(private authService: AuthService,
              private route: Router,
              public panierService: PanierService) {  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  logout(){
    this.authService.logout();
    this.route.navigate(['/connexion']);
  }


}
