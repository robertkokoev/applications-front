import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Category } from '../../../common/types';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

type CategoryWithKey = Partial<Category> & { key: string | null };

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent {

  readonly categoriesRef = this.db.list<Category>('categories');
  readonly categories$: Observable<CategoryWithKey[]> = this.categoriesRef.snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
    );
  readonly form = this.fb.group({
    label: this.fb.control('', Validators.required),
    value: this.fb.control('', Validators.required)
  });

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  add(): void {
    this.categoriesRef.push(this.form.value)
      .then(() => this.form.reset())
      .then(() => this.snackbar.open('Категория добавлена', undefined, { duration: 3000 }));
  }

  remove(key: string | null): void {
    if (!key) {
      return;
    }

    this.categoriesRef.remove(key)
      .then(() => this.snackbar.open('Категория удалена', undefined, { duration: 3000 }));
  }
}
