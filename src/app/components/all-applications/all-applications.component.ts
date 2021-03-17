import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application, ApplicationWithKey } from '../../common/types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.scss']
})
export class AllApplicationsComponent {

  readonly applicationsRef = this.db.list<Application>('applications');
  readonly applications$: Observable<ApplicationWithKey[]> = this.applicationsRef.snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );

  constructor(private db: AngularFireDatabase) { }

}
