import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application } from '../../../common/types';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

type ApplicationWithKey = Partial<Application> & { key: string | null };

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html',
  styleUrls: ['./user-applications.component.scss']
})
export class UserApplicationsComponent implements OnInit {

  readonly applicationsRef = this.db.list<Application>('applications');
  readonly applications$: Observable<ApplicationWithKey[]> = this.applicationsRef.snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
      withLatestFrom(this.afAuth.user),
      map(([applications, user]) => applications.filter(a => a.userId === user?.uid))
    );

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  remove(key: string | null): void {
    if (!key) {
      return;
    }

    this.applicationsRef.remove(key).then(() => this.snackbar.open('Заявка удалена', undefined, { duration: 3000 }));
  }

}
