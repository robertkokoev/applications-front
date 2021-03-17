import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserOutput } from '../../common/types';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';
import { from, throwError } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  readonly usersRef = this.db.list<UserOutput>('users');
  readonly form = this.fb.group({
    login: this.fb.control(''),
    password: this.fb.control('')
  });

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const { password, login } = this.form.value;

    this.usersRef.valueChanges()
      .pipe(
        first(),
        map(users => users.find(u => u.login === login)),
        filter(user => !!user),
        switchMap(user => from(this.afAuth.signInWithEmailAndPassword(user!.email, password))),
        catchError(e => {
          this.snackbar.open(e.message, undefined, { duration: 3000 });
          return throwError(e);
        })
      ).subscribe(() => this.router.navigate(['/account']));
  }

}
