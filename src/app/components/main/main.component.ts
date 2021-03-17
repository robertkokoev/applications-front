import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application } from '../../common/types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  readonly applicationsRef = this.db.list<Application>('applications', ref => ref.limitToLast(4));
  readonly applications$ = this.applicationsRef.valueChanges();

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
  }

}
