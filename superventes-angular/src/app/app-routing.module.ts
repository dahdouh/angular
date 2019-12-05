import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProduitComponent} from './produit/produit.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {CategoriesComponent} from './categories/categories.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {AuthGuard} from './helpers/auth.guard';
import {CategoriesViewComponent} from './categories/categories-view/categories-view.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {PanierComponent} from './panier/panier.component';
import {SearchComponent} from './produit/search/search.component';
import {MenuComponent} from './menu/menu.component';
import {AddComponent} from './produit/add/add.component';


const routes: Routes = [
  {path: '', redirectTo: 'produits', pathMatch: 'full'},
  {path: 'produits', component: ProduitComponent},
  {path: 'produits/search', component: SearchComponent},
  {path: 'produits/add', component: AddComponent},
  {path: 'panier', canActivate: [AuthGuard], component: PanierComponent, outlet: 'panier-outlet'},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:id', component: CategoriesViewComponent},
  {path: '**', component: PagenotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
