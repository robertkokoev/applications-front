import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthComponent } from './components/auth/auth.component';
import { AccountComponent } from './components/account/account.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MainComponent } from './components/main/main.component';
import { UserApplicationsComponent } from './components/account/user-applications/user-applications.component';
import { CreateApplicationComponent } from './components/account/create-application/create-application.component';
import { CategoryManagementComponent } from './components/account/category-management/category-management.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'auth',
        component: AuthComponent
      },
      {
        path: 'account',
        component: AccountComponent,
        children: [
          {
            path: 'user-applications',
            component: UserApplicationsComponent
          },
          {
            path: 'create-application',
            component: CreateApplicationComponent
          },
          {
            path: 'categories-management',
            component: CategoryManagementComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
