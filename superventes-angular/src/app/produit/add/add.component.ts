import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProduitsService} from '../../services/produits.service';
import {Produit} from '../../models/produit.model';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Router} from '@angular/router';
import {Categories} from '../../models/categories.model';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  produitForm: FormGroup;
  preview: string;
  categories: Categories[] = [];

  constructor(private produitsService: ProduitsService,
              private categoriesService: CategoriesService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.categoriesService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  initForm() {
    this.produitForm = this.formBuilder.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      image: [null, Validators.required]
    });
  }


  // image upload
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.produitForm.patchValue({
      image: file
    });
    this.produitForm.get('image').updateValueAndValidity()
    // visualiser image
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSubmitForm(){
    this.produitsService.addProduit(
      this.produitForm.value.nom,
      this.produitForm.value.type,
      this.produitForm.value.prix,
      this.produitForm.value.image
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('requête a été envoyé!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Réponse a été reçu!');
          break;
        case HttpEventType.Response:
          console.log('Poroduit crée avec succes!', event.body);
          this.router.navigate(['/produits']);
      }
    });
  }

}
