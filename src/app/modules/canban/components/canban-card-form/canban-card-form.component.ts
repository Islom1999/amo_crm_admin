import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, of } from 'rxjs';
import { CanbanService } from '../../services/canban.service';

@Component({
  selector: 'app-canban-card-form',
  templateUrl: './canban-card-form.component.html',
  styleUrl: './canban-card-form.component.scss'
})
export class CanbanCardFormComponent {
  parent_id!: string
  id!: string
  form: FormGroup = new FormGroup({});

  constructor(
    private baseSrv: CanbanService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
  }

  ngOnInit(): void {
    // forma elementlari
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.id = this.config.data.id;
    this.parent_id = this.config.data.parent_id;
    if (this.id) {
      this.baseSrv.getByIdCard(this.id).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.id) {
        this.update(this.id);
      } else {
        this.create();
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create(obj?: Object) {
    const data = obj ? obj : { ...this.form.value, id: (new Date()).toString(), date: new Date() }
    this.baseSrv
      .addCardToList(this.parent_id ,{ ...data })
      .pipe(
        catchError(({ error }) => {
          return of();
        })
      )
      .subscribe(() => {
        this.ref.close()
      });
  }

  update(id: string, obj?: Object) {
    const data = obj ? obj : { ...this.form.value }
    this.baseSrv
      .updateCardInList(this.parent_id, id, { ...data })
      .pipe(
        catchError(({ error }) => {
          return of();
        })
      )
      .subscribe(() => {
        this.ref.close()
      });
  }

  back() {
    this.ref.close()
  }
}
