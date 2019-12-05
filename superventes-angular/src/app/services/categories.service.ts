import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categories} from '../models/categories.model';
import {Produit} from '../models/produit.model';
import {tap} from 'rxjs/operators';

const url = "categories";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Categories> {
    return this.httpClient.get<Categories>(url);
  }

  getCategoriesByName(id: number): Observable <Categories> {
    return this.httpClient.get<Categories>("produits/" + id);
  }

}
