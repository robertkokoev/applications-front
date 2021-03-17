import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthComponent } from './components/auth/auth.component';
import { AccountComponent } from './components/account/account.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent
      },
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
