import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
form: FormGroup

type: 'login' | 'signup' | 'reset' = 'signup';
loading = false;

serverMessage: string;


  constructor( private auth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [ Validators.minLength(6), Validators.required]
      ]
  })
  }

  changeType(val){
    this.type = val
  }

  get isLogin(){
    return this.type === 'login'
  }

  get isSignup(){
    return this.type === 'signup'
  }

  get passwordConfirm(){
    if(this.type !== 'signup'){
      return true
    } else {
      return this.passwordConfirm.value === this.passwordConfirm.value
    }
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  get isPasswordReset(){
  return this.type === 'reset';
  }

  get passwordDoesMatch(){
    return this.form.get('passwordConfirm');
  }

  async onSubmit(){
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value

    try{
      if(this.isLogin){
        await this.auth.auth.signInWithEmailAndPassword(email,password);
      }
      if(this.isSignup){
        await this.auth.auth.createUserWithEmailAndPassword(email, password);
      }
      if(this.isPasswordReset){
        await this.auth.auth.sendPasswordResetEmail(email);
        this.serverMessage = "Check your email"
      }


    } catch(err){
      this.serverMessage = err;
    }

    this.loading = false;
  }
}