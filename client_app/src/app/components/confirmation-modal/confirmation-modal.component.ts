import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogDto } from 'src/app/global/confirmationDialogDto';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogDto,
  ) {}

  cancel(): void {
    this.data.confirmed = false;
    this.dialogRef.close();
  }

  confirm(): void {
    this.data.confirmed = true;
    this.dialogRef.close();
  }
}
