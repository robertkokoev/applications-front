import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application, Category } from '../../../common/types';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent {

  readonly applicationsRef = this.db.list<Application>('applications');
  readonly categoriesRef = this.db.list<Category>('categories');
  readonly categories$ = this.categoriesRef.valueChanges();
  readonly form = this.fb.group({
    name: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    category: this.fb.control('', Validators.required),
    photo: this.fb.control(null, Validators.required),
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

  selectFile(event: any): void {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = result => {
      this.form.controls.photo.setValue(result.target?.result);
    };
  }
}
