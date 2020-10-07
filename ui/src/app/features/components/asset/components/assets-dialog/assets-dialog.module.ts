import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AssetsDialogComponent } from './assets-dialog.component';

@NgModule({
  declarations: [
    AssetsDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [
    AssetsDialogComponent
  ]
})
export class AssetsDialogModule { }
