import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

interface User {
  name: string;
  login: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  readonly usersRef = this.db.list<User>('users');
  readonly form = this.fb.group({
    name: this.fb.control('', Validators.required),
    login: this.fb.control('', Validators.required),
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  registration(): void {
    this.usersRef.push(this.form.value);
    console.log(this.form.value);
  }

}
