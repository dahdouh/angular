import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produit } from '../models/produit.model';
import {Observable, of, Subject, throwError} from 'rxjs';
import {User} from '../models/User.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const url = "produits";
const urlSearch = "produits/search";
const urlAdd = "produits/add";

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private httpClient: HttpClient) { }

  getProduits(): Observable<Produit> {
    return this.httpClient.get<Produit>(url);
  }

  searchProduit(search: string) {
    return this.httpClient.post<Produit>(urlSearch, {search});
  }

  addProduit(nom: string, type: string, prix: number, image: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("nom", nom);
    formData.append("type", type);
    formData.append("prix", prix);
    formData.append("image", image);
    return this.httpClient.post<any>(urlAdd, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
