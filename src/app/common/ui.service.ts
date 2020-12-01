import { Injectable, Component, Inject } from '@angular/core'
import { Observable } from 'rxjs'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private snackBar: MatSnackBar, 
    private dialog: MatDialog) {}

    showToast(message: string, action = 'Close', config?: MatSnackBarConfig) {
      this.snackBar.open(message, action, config || {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }

    showDialog(
      title: string,
      content: string,
      okText = 'OK',
      cancelText?: string, 
      customConfig?: MatDialogConfig
      ): Observable<Boolean> {
      const dialogRef = this.dialog.open(
        SimpleDialogComponent,
        customConfig || {
        width: '300px',
        data: { 
          title: title, 
          content: content, 
          okText: okText,
          cancelText: cancelText 
        },
      } )
      return dialogRef.afterClosed() 
    }

}