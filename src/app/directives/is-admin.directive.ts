import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserOutput } from '../common/types';
import { combineLatest } from 'rxjs';

@Directive({ selector: '[isAdmin]' })
export class IsAdminDirective implements OnInit {

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

        userInArray.role === 'ADMIN'
          ? this.viewContainerRef.createEmbeddedView(this.templateRef)
          : this.viewContainerRef.clear();
      });
  }

}
