import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

const routes: Routes=[
  {
    path: '',
    component: RoleComponent
  }
]

@NgModule({
  declarations: [
    RoleComponent
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
export class RoleModule { }
