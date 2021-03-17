import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserOutput } from '../../common/types';
import { CachedUserService } from '../../common/cached-user.service';

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
    password: this.fb.control('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private cachedUser: CachedUserService
  ) { }

  registration(): void {
    const { email, login, name, password }: UserInput = this.form.value;

    this.afAuth.createUserWithEmailAndPassword(email, password).then(r => {
      if (!r.user) {
        return;
      }

      const user: UserOutput = { name, email, login, role: 'USER', id: r.user?.uid };

      this.usersRef.push(user);
      this.cachedUser.cacheUser(user);
    });
  }

}
