import { NgModule } from '@angular/core';
import { IsUserDirective } from './is-user.directive';
import { IsAdminDirective } from './is-admin.directive';

@NgModule({
  declarations: [
    IsUserDirective,
    IsAdminDirective
  ],
  exports: [
    IsUserDirective,
    IsAdminDirective
  ]
})
export class DirectivesModule { }
