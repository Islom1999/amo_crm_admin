import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPermissionsModule } from "ngx-permissions";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ImageModule } from 'primeng/image';

@NgModule({
    declarations:[
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NgxPermissionsModule,
        ToastModule,
        ReactiveFormsModule,

        // PrimeNG
        TableModule,
        InputTextModule,
        MultiSelectModule,
        ConfirmDialogModule,
        InputTextareaModule,
        EditorModule,
        DropdownModule,
        InputNumberModule,
        AutoCompleteModule,
        SkeletonModule,
        CalendarModule,
        InputMaskModule,
        ImageModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        NgxPermissionsModule,
        ReactiveFormsModule,

        // PrimeNG
        TableModule,
        InputTextModule,
        MultiSelectModule,
        ConfirmDialogModule,
        InputTextareaModule,
        EditorModule,
        DropdownModule,
        InputNumberModule,
        AutoCompleteModule,
        SkeletonModule,
        CalendarModule,
        InputMaskModule,
        ImageModule,

        // pipe 
    ],
})
export class BaseModule { }
