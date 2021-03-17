import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-file-button',
  templateUrl: './select-file-button.component.html',
  styleUrls: ['./select-file-button.component.scss']
})
export class SelectFileButtonComponent {

  @Output()
  fileSelected = new EventEmitter<string | ArrayBuffer | null | undefined>();

  file: string | ArrayBuffer | null | undefined = '';

  constructor() { }

  selectFile(event: any): void {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = result => {
      this.file = result.target?.result;
      this.fileSelected.emit(this.file);
    };
  }

}
