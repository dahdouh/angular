import { Component, OnInit } from '@angular/core';
import {Panier} from '../models/panier.model';
import {PanierService} from '../services/panier.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Produit} from '../models/produit.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier: Panier ;
  panierForm: FormGroup;

  constructor(public panierService: PanierService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.panier = this.panierService.panier;
    this.initForm();
  }

  initForm(){
    this.panierForm = this.formBuilder.group({
      quantite : ['', [Validators.required, Validators.min(1)]]
    });
  }

  onModifyQuantityPanier(p: Produit): void {
    this.panierService.modifyQuantityPanier(p, this.panierForm.value['quantite']);
  }

  onRemoveCommand(index: number): void {
    this.panierService.removeCommand(index);
  }
  onValidateCommand(panier: Panier): void{
    this.panierService.validateCommmand(panier).subscribe(data => {
      console.log("panier bien inserer "+ data);
    });
    localStorage.removeItem("panier");
    //this.panier.commandProduits.length = 0;
    this.panier.commandProduits.splice(0, this.panier.commandProduits.length);
  }

}
