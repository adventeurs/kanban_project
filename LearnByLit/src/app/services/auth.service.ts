import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User } from "firebase";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userRef: Observable<User>;

  // Access Currently Logged In User Info
  public get user$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.userRef = auth.authState.pipe(
      switchMap((user) => {
        // If User Is Logged In
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // If User Is Not Logged In
          return of(null);
        }
      })
    );
  }

  private _currentUser$: BehaviorSubject<User>;
  private get currentUser$(): BehaviorSubject<User> {
    if (!this._currentUser$) {
      this._currentUser$ = new BehaviorSubject<User>(undefined);
      this.userRef.subscribe(this._currentUser$);
    }

    return this._currentUser$;
  }
}
