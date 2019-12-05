import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../models/User.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.userForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['prenom'],
      formValue['nom'],
      formValue['email'],
      formValue['password'],
      ''
    );

    this.authService.userInscription(newUser)
      .subscribe((res: any) => {
        console.log("un nouvell utilisateur a bien ajouté à la base MongoDB");
        this.router.navigate(['/produits']);
      }, (err: any) => {
        console.log("erreur lors l'inscription du nouveau utilisateur");
    });
  }

}
