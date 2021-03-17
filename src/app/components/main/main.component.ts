import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application, ApplicationWithKey } from '../../common/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  readonly applicationsRef = this.db.list<Application>('applications', ref => ref.limitToLast(4));
  readonly applications$: Observable<ApplicationWithKey[]> = this.applicationsRef.valueChanges()
    .pipe(
      map(applications => applications.map(a => ({ ...a, key: null })))
    );

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
  }

}
