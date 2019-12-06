import { Injectable } from '@angular/core';
import {Produit} from '../models/produit.model';
import {CommandProduit} from '../models/CommandProduit.model';
import {Panier} from '../models/panier.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/User.model';

const url = "panier/add";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panier: Panier;

  constructor(private httpClient: HttpClient) {
      if(!this.panier) {
        this.panier = new Panier();
      } else {
        this.panier = JSON.parse(localStorage.getItem("panier"));   //recuperer le panier à partir de local storage
      }
  }

  addProduitPanier(p: Produit, quantite: number){
    let commandProduit: CommandProduit = this.panier.commandProduits.find(x => x.produit._id === p._id);
    if(commandProduit) {
      commandProduit.quantite +=  quantite;
    } else {
      commandProduit = new CommandProduit();
      commandProduit.produit = p;
      commandProduit.quantite = quantite
      this.panier.commandProduits.push(commandProduit);
    }
    this.savePanier();
  }
  modifyQuantityPanier(p: Produit, quantite: number): void {
    let commandProduit: CommandProduit = this.panier.commandProduits.find(x => x.produit._id === p._id);
    if(commandProduit) {
      commandProduit.quantite = quantite;
      this.savePanier();
    }
  }

  getTotal(): number {
    let total = 0;
    for(let cp of this.panier.commandProduits) {
      total += cp.produit.prix * cp.quantite;
    }
    return total;
  }

  savePanier() {
    localStorage.setItem("panier", JSON.stringify(this.panier));
  }

  removeCommand(index: number) {
    this.panier.commandProduits.splice(index, 1);
    console.log(index);
    this.savePanier();
  }

  validateCommmand(p: Panier): Observable<Panier> {
    return this.httpClient.post<Panier>(url, p, httpOptions);
  }

}
