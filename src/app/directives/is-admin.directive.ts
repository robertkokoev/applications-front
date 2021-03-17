import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserOutput } from '../common/types';
import { combineLatest } from 'rxjs';

@Directive({ selector: '[isAdmin]' })
export class IsAdminDirective implements OnInit {

  @Input('isAdminElseTemplate')
  elseTemplate?: TemplateRef<any>;

  readonly usersRef = this.db.list<UserOutput>('users');

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    combineLatest([this.usersRef.valueChanges(), this.afAuth.user])
      .subscribe(([users, user]) => {
        const userInArray = users.find(u => u.id === user?.uid);

        if (!userInArray) {
          this.viewContainerRef.clear();
          return;
        }

        if (userInArray.role === 'ADMIN') {
          this.viewContainerRef.clear();
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
