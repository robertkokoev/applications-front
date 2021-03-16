import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  readonly form = this.fb.group({
    email: this.fb.control(''),
    password: this.fb.control('')
  });

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const { email, password } = this.form.value;

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/account']))
      .catch(e => this.snackbar.open(e.message, undefined, { duration: 3000 }));
  }

}
