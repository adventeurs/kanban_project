import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor( private auth: AngularFireAuth) { }

  @HostListener('click')
  onClick(){
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
}
