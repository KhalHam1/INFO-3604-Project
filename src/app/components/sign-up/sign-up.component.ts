import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function matchingPasswordsValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return{
        thePasswordsDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    emailAddress: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  }, {validators: matchingPasswordsValidator()})

  constructor(private authService: AuthenticationService, private toast: HotToastService, private router: Router) { }

  ngOnInit(): void {
  }

  get name(){
    return this.signUpForm.get('name');
  }

  get emailAddress(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  submit(){
    if(!this.signUpForm.valid) return;

    const {name, emailAddress, password} = this.signUpForm.value;
    this.authService.signUp(name,emailAddress,password).pipe(
      this.toast.observe({
        success: 'Congrats. Sign Up Successful.',
        loading: 'Loading...',
        error: ({message}) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

}
