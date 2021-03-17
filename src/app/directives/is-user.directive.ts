import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[isUser]' })
export class IsUserDirective implements OnInit {

  @Input('isUserElseTemplate')
  elseTemplate?: TemplateRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    // Если пользователь авторизован - рисуем
    // Если нет. то смотрим, передано ли какое-то альтернативное представление
    // Если да, то рисуем, если нет то очищаем вовсе
    this.afAuth.user.pipe(first())
      .subscribe(u => u
        ? this.viewContainerRef.createEmbeddedView(this.templateRef)
        : this.elseTemplate
          ? this.viewContainerRef.createEmbeddedView(this.elseTemplate)
          : this.viewContainerRef.clear()
      );
  }

}
