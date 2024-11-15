import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: "Asosiy",
                items: [
                    { 
                        label: "Dashboard", 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/dashboard'],
                    }
                ],
            },
            {
                label: 'Canban',
                items: [
                    { 
                        label: "Canban", 
                        icon: 'pi pi-fw pi-sitemap', 
                        routerLink: ['/canban'],
                    }
                ],
            },
            {
                label: 'Xarita',
                items: [
                    { 
                        label: "Xarita", 
                        icon: 'pi pi-fw pi-map-marker', 
                        routerLink: ['/map'],
                    }
                ],
            },
            {
                label: 'Boshqaruv',
                items: [
                    { 
                        label: "Hududar", 
                        icon: 'pi pi-fw pi-map', 
                        routerLink: ['/area'],
                    },
                    { 
                        label: "Hodimlar", 
                        icon: 'pi pi-fw pi-users', 
                        routerLink: ['/worker'],
                    },
                    { 
                        label: "Rolelar", 
                        icon: 'pi pi-check-square', 
                        routerLink: ['/role'],
                    }
                ],
            }
        ];
    }
}
