import { BasePageComponent } from './views/admin/base-page/base-page.component';
import { BaseLoginComponent } from './views/admin/base-login/base-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/admin/login/login.component';
import { AuthGuard } from './directives/auth.guard';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: BaseLoginComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: '',
    component: BasePageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'membership', loadChildren: './views/membership/membership.module#MembershipModule' }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
