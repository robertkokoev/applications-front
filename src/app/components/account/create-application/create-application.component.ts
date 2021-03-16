import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application } from '../../../common/types';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent {

  readonly applicationsRef = this.db.list<Application>('applications');
  readonly form = this.fb.group({
    name: this.fb.control(''),
    description: this.fb.control(''),
    category: this.fb.control(''),
  });

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  create(): void {
    this.afAuth.user.pipe(first()).subscribe(user => {
      if (!user) {
        return;
      }

      this.applicationsRef.push({ ...this.form.value, status: 'NEW', userId: user.uid });
    });
  }

}
