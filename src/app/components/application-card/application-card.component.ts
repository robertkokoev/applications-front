import { Component, Input, OnInit } from '@angular/core';
import { Application, ApplicationWithKey } from '../../common/types';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss']
})
export class ApplicationCardComponent implements OnInit {

  readonly applicationsRef = this.db.list<Application>('applications');

  @Input()
  application = { } as ApplicationWithKey;

  constructor(
    private db: AngularFireDatabase,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  remove(key: string | null): void {
    if (!key) {
      return;
    }

    this.applicationsRef.remove(key)
      .then(() => this.snackbar.open('Заявка удалена', undefined, { duration: 3000 }));
  }

}
