import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  login(): void {
    const { email, password } = this.form.value;

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(r => console.log(r))
      .catch(e => console.error(e));
  }

}
