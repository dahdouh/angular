import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../models/produit.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/User.model';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommandProduit} from '../models/CommandProduit.model';
import {Panier} from '../models/panier.model';
import {PanierService} from '../services/panier.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: Produit[] = [];
  currentUser: User;
  panierForm: FormGroup;

  constructor(private produitsService: ProduitsService,
              private authService: AuthService,
              private panierService: PanierService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.authService.currentUser.subscribe( user => this.currentUser = user);
    this.produitsService.getProduits()
      .subscribe((res: any) => {
        this.produits = res;
      }, err => {
        console.log(err);
      });

    this.initForm();
  }

  initForm() {
    this.panierForm = this.formBuilder.group({
      quantite: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addProduitPanier(p: Produit): void {
    this.panierService.addProduitPanier(p, this.panierForm.value['quantite']);
  }

}
