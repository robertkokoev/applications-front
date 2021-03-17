import { NgModule } from '@angular/core';
import { IsUserDirective } from './is-user.directive';

@NgModule({
  declarations: [IsUserDirective],
  exports: [IsUserDirective]
})
export class DirectivesModule { }
