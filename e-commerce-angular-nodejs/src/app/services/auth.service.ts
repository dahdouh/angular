import { Injectable } from '@angular/core';
import {User} from '../models/User.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Produit} from '../models/produit.model';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {PanierService} from './panier.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const url = "users/inscription";
const urlAuth = "users/connexion";
const urlUserSearch = "users/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  //userLoggedIn: User;

  constructor(private httpClient: HttpClient,
              private panierService: PanierService,
              private route: Router){
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(urlAuth, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const result: boolean = JSON.parse(JSON.stringify(user))['result'];
        if (result) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          /*
          // recupérer les données de l'utilisateur connecté et les stocker dans le localStorage.
          this.userSearch(email)
            .subscribe((data: User) => {
              this.userLoggedIn = data;
            });
          localStorage.setItem('userLoggedIn', JSON.stringify(this.userLoggedIn));
           */
        }
        return result;
      }));
  }

  userSearch(email: string): Observable<User> {
    return this.httpClient.get<User>(urlUserSearch + '' + email);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.panierService.panier.commandProduits.length = 0;
  }


  userInscription(user: User): Observable<User> {
    return this.httpClient.post<User>(url, user, httpOptions).pipe(
      tap((prod: User) => console.log(`utilisateur bien ajouter w/ id=${user.nom}`))
    );
  }

}
