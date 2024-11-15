import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { canActivatePermission } from './shared';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./modules').then((m) => m.DashboardModule)
                    },
                    {
                        path: 'canban',
                        loadChildren: () => import('./modules').then((m) => m.CanbanModule)
                    },
                    {
                        path: 'map',
                        loadChildren: () => import('./modules').then((m) => m.MapModule)
                    },
                    {
                        path: 'area',
                        loadChildren: () => import('./modules').then((m) => m.AreaModule)
                    },
                    {
                        path: 'worker',
                        loadChildren: () => import('./modules').then((m) => m.WorkerModule)
                    },
                    {
                        path: 'role',
                        loadChildren: () => import('./modules').then((m) => m.RoleModule)
                    }
                ]
            },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], 
        // { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }, 
        { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
