import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {Produit} from '../../models/produit.model';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User.model';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PanierService} from '../../services/panier.service';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.css']
})
export class CategoriesViewComponent implements OnInit {

  produits: Produit[];
  currentUser: User;
  panierForm: FormGroup;

  constructor(private categorieService: CategoriesService,
              private authService: AuthService ,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private panierService: PanierService,
              private router: Router) {

    /*
    To solve not load page if URL change
     */
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe( user => this.currentUser = user);

    let id = this.route.snapshot.params['id'];
    this.categorieService.getCategoriesByName(id)
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

  onAddProduitPanier(p: Produit) {
    this.panierService.addProduitPanier(p, this.panierForm.value['quantite']);
  }

}
