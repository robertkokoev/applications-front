import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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
    this.afAuth.user
      .subscribe(u => {
        if (u) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
          return;
        }

        if (this.elseTemplate) {
          this.viewContainerRef.clear();
          this.viewContainerRef.createEmbeddedView(this.elseTemplate);
          return;
        }

        this.viewContainerRef.clear();
      });
  }

}
