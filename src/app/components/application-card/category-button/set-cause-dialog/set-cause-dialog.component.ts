import { Component, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Application } from '../../../../common/types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-cause-dialog',
  templateUrl: './set-cause-dialog.component.html',
  styleUrls: ['./set-cause-dialog.component.scss']
})
export class SetCauseDialogComponent {

  readonly applicationsRef = this.db.list<Application>('applications');

  file = '';
  cause = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { key: string, type: 'REJECTED' | 'SOLVED' },
    private db: AngularFireDatabase,
    private dialogRef: MatDialogRef<SetCauseDialogComponent>
  ) { }

  selectFile(file: string | ArrayBuffer | null | undefined): void {
    if (typeof file !== 'string') {
      return;
    }

    this.file = file;
  }

  okay(): void {
    const applicationPart: Partial<Application> = this.data.type === 'SOLVED'
      ? { afterPhoto: this.file, status: this.data.type }
      : { rejectedCause: this.cause, status: this.data.type };

    this.applicationsRef
      .update(this.data.key, applicationPart)
      .then(() => this.dialogRef.close(true));
  }
}
