import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserOutput } from '../../common/types';
import { map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

type UserInput = UserOutput & { password: string };

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  readonly usersRef = this.db.list<UserOutput>('users');
  readonly form = this.fb.group({
    name: this.fb.control('', Validators.required),
    login: this.fb.control('', Validators.required),
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  registration(): void {
    const formValue: UserInput = this.form.value;

    this.usersRef.valueChanges()
      .pipe(
        map(users => users.some(u => u.login === formValue.login) ? null : formValue),
        switchMap(value => {
          if (value === null) {
            alert('Логин занят');
            return of(null);
          }

          return from(this.afAuth.createUserWithEmailAndPassword(value.email, value.password));
        })
      )
      .subscribe(r => {
        if (!r?.user) {
          return;
        }

        const { login, name, email } = formValue;
        const user: UserOutput = { name, email, login, role: 'USER', id: r.user.uid };

        this.usersRef.push(user);
      });
  }

}
