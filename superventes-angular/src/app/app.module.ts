import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { MenuComponent } from './menu/menu.component';
import { ProduitComponent } from './produit/produit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InscriptionComponent } from './inscription/inscription.component';
import {ProduitsService} from './services/produits.service';
import {AuthService} from './services/auth.service';
import {CategoriesService} from './services/categories.service';
import { CategoriesViewComponent } from './categories/categories-view/categories-view.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {PanierService} from './services/panier.service';
import { PanierComponent } from './panier/panier.component';
import { SearchComponent } from './produit/search/search.component';
import { AddComponent } from './produit/add/add.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ConnexionComponent,
    MenuComponent,
    ProduitComponent,
    InscriptionComponent,
    CategoriesViewComponent,
    PagenotfoundComponent,
    PanierComponent,
    SearchComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProduitsService,
    AuthService,
    CategoriesService,
    PanierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
