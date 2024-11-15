import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AreaComponent } from './area.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';

const routes: Routes=[
  {
    path: '',
    component: AreaComponent
  }
]

@NgModule({
  declarations: [
    AreaComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    TableModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TagModule
  ],
  providers:[
    ConfirmationService
  ]
})
export class AreaModule { }
