import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../services/categories.service';
import {Categories} from '../models/categories.model';
import {ActivatedRoute, Params} from '@angular/router';
import {Produit} from '../models/produit.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Categories[];

  constructor(private categoriesService: CategoriesService,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
      }, err => {
        console.log(err);
    });
  }

}
