import { LOCALE_ID, NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptor, CustomCurrencyPipe, ErrorInterceptor } from './shared';

import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { BaseModule } from './base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';

registerLocaleData(localeTr, 'tr');

@NgModule({
    declarations: [
        AppComponent, 
        NotfoundComponent,
        // CustomCurrencyPipe,
    ],
    imports: [
        AppRoutingModule, 
        AppLayoutModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPermissionsModule.forRoot(),

        ToastModule,
        BaseModule,
        ButtonModule,
        RippleModule,
        BadgeModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'tr' },

        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
    exports: [
        // CustomCurrencyPipe
    ]
})
export class AppModule {}
