import { Component, OnInit } from '@angular/core';
import {Produit} from '../../models/produit.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProduitsService} from '../../services/produits.service';
import {User} from '../../models/User.model';
import {AuthService} from '../../services/auth.service';
import {PanierService} from '../../services/panier.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  produitsSearch: Produit[] = [];
  searchForm: FormGroup;
  panierForm: FormGroup;
  currentUser: User;

  constructor(private produitsService: ProduitsService,
              private authService: AuthService,
              private panierService: PanierService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
    this.initFormSearch();
    this.initFormPanier();
  }

  initFormSearch() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  initFormPanier(){
    this.panierForm = this.formBuilder.group({
      quantite: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSearchProduit(): void {
    this.produitsService.searchProduit(this.searchForm.value['search']).subscribe(
      (res: any) => {
        this.produitsSearch = res;
      }, error => {
        console.log(error);
      }
    );
  }
  onAddProduitPanier(p: Produit) {
    this.panierService.addProduitPanier(p, this.panierForm.value['quantite']);
  }

}
