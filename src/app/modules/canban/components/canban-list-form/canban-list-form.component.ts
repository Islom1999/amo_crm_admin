import { Component } from '@angular/core';
import { CanbanService, List } from '../../services/canban.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-canban-list-form',
  templateUrl: './canban-list-form.component.html',
  styleUrl: './canban-list-form.component.scss'
})
export class CanbanListFormComponent {
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
    });

    this.id = this.config.data.id;
    if (this.id) {
      this.baseSrv.getByIdList(this.id).subscribe((data) => {
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
    const data = obj ? obj : { ...this.form.value, id: (new Date()).toString(), cards: [] }
    this.baseSrv
      .addList({ ...data })
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
      .updateList(id, { ...data })
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
