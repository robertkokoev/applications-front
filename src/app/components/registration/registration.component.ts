import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserOutput } from '../../common/types';

type UserInput = UserOutput & { password: string };

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  readonly usersRef = this.db.list<UserOutput>('users');
  readonly form = this.fb.group({
    name: this.fb.control('', Validators.required),
    login: this.fb.control('', Validators.required),
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  constructor(private fb: FormBuilder, private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  registration(): void {
    const { email, login, name, password }: UserInput = this.form.value;

    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => console.log('success'));
    this.usersRef.push({ name, email, login, role: 'USER' });
    console.log(this.form.value);
  }

}
