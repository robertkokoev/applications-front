import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application } from '../../../common/types';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  readonly applicationsRef = this.db.list<Application>('applications');
  readonly form = this.fb.group({
    name: this.fb.control(''),
    description: this.fb.control(''),
    category: this.fb.control(''),
  });

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  create(): void {
    this.applicationsRef.push({ ...this.form.value, status: 'NEW' });
  }

}
