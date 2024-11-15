import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanbanComponent } from './canban.component';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from 'primeng/dialog';
import { CanbanCardFormComponent } from './components/canban-card-form/canban-card-form.component';
import { CanbanListFormComponent } from './components/canban-list-form/canban-list-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

const routes: Routes=[
  {
    path: '',
    component: CanbanComponent
  }
]

@NgModule({
  declarations: [
    CanbanComponent,
    CanbanCardFormComponent,
    CanbanListFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    DragDropModule,
    DialogModule,
    ButtonModule

  ]
})
export class CanbanModule { }
