import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    validateForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
    }> = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    submitForm(): void {
        if (this.validateForm.valid) {
            const data = {
                email: this.validateForm.value.email!,
                password: this.validateForm.value.password!,
            };
            this.authService
                .login(data)
                .pipe(
                    tap(() => this.router.navigate(['/'])),
                    catchError(() => {
                        this.validateForm.reset();
                        return of();
                    })
                )
                .subscribe();
        } else {
            Object.values(this.validateForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    constructor(
        private fb: NonNullableFormBuilder,
        private authService: AuthService,
        private router: Router,
        public layoutService: LayoutService
    ) { }
}
