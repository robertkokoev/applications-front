import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SetCauseDialogComponent } from './set-cause-dialog/set-cause-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent {

  @Input()
  status: 'NEW' | 'SOLVED' | 'REJECTED' = 'NEW';

  @Input()
  applicationKey: string | null = '';

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  solved(): void {
    this.dialog.open(SetCauseDialogComponent, { data: { key: this.applicationKey, type: 'SOLVED' } }).afterClosed()
      .subscribe(r => {
        if (!r) {
          return;
        }

        this.snackbar.open('Статус заявки сменен', undefined, { duration: 3000 });
      });
  }

  rejected(): void {
    this.dialog.open(SetCauseDialogComponent, { data: { key: this.applicationKey, type: 'REJECTED' } }).afterClosed()
      .subscribe(r => {
        if (!r) {
          return;
        }

        this.snackbar.open('Статус заявки сменен', undefined, { duration: 3000 });
      });
  }
}
