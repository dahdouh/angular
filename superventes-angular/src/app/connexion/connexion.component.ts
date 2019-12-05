import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {User} from '../models/User.model';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.initForm();
    // si authentification réussie , rediriger vers URL précédente, sinon vers la page d'accueil.
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  initForm(){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    this.submitted = true;

    this.authService.login(formValue['email'], formValue['password'])
      .subscribe(
        connected => {
          if (connected) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.error = 'Login ou mot de passe est incorrect';
        }
        });
  }

}
