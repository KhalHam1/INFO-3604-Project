import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { onValue, ref } from 'firebase/database';
import { FirebaseDBServiceService } from 'src/app/services/firebase-dbservice.service';
import { createUserWithEmailAndPassword, getAuth, User } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
//import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { getDatabase, set } from "firebase/database";
import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { AngularFireDatabase} from '@angular/fire/database';
//import { AuthenticationService } from 'src/app/services/authentication.service';

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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
  
})

export class AdminComponent implements OnInit {
  currentView = "add"

  addForm = new FormGroup({
    name: new FormControl('',Validators.required),
    emailAddress: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  }, {validators: matchingPasswordsValidator()})

  // deleteForm = new FormGroup({
  //   emailAddress2: new FormControl('', [Validators.required, Validators.email])
  // })
  currentUser: any;
  userCredential: any;
  USER: any;
  listUsers: any = new Array();
  deleteEmail: string = '';

  constructor(private authService: AuthenticationService, private toast: HotToastService, private auth:Auth,
    private firebase:FirebaseDBServiceService, public dialogRef: MatDialog) {
    this.currentUser = this.auth.currentUser;
    const list: any[] = []
    const usersRef = ref(this.firebase.dbRef ,'users');

    onValue(usersRef, (snapshot) => {
      this.listUsers.length = 0;
      const data = snapshot.val();

      if( !data ) return;

      Object.entries(data).forEach((entry:any)=>{
        const[userIdentifier, userInfo] = entry;

        let info : {userIdentifier:string, account_type:string, email:string};
        info = {userIdentifier:userIdentifier, account_type:userInfo.account_type, email:userInfo.email}
        this.listUsers.push(info)
      });
      
    })

  }

  

  ngOnInit(): void {
  }

  get name(){
    return this.addForm.get('name');
  }

  get emailAddress(){
    return this.addForm.get('email');
  }

  // getemailAddress2(){
  //   return this.deleteForm.get('email')
  // }

  get password(){
    return this.addForm.get('password');
  }

  get confirmPassword(){
    return this.addForm.get('confirmPassword');
  }

  createAccount(email:string, password:string){
    // return createUserWithEmailAndPassword(this.auth,email,password).then( (userCredentials)=>{
    //  return userCredentials.user.uid;
    //})
    return createUserWithEmailAndPassword(this.auth,email,password);
    //userCredentials.user.uid
  }

  async addSubmit(){
    if(!this.addForm.valid) return;

    const {name, emailAddress, password} = this.addForm.value;
    this.userCredential =  await this.createAccount(emailAddress,password)
    console.log("\n\nNew User Credential: "+ this.userCredential, "\n\n\n")
      //this.userCredential =  this.createAccount(emailAddress,password)
    //this.userID = this.currentUser.userId
    // this.authService.signUp(name,emailAddress,password).pipe(
    //   this.toast.observe({
    //     success: 'User Added.',
    //     loading: 'Loading...',
    //     error: ({message}) => `${message}`
    //   })
    // ).subscribe(() => {
    //   //this.router.navigate(['/home'])
    // })
  
    //const database = getDatabase();
    const userId = this.userCredential.user.uid;
    console.log("\n\nNew User ID: "+ userId, "\n\n\n")

    if( !userId){
      this.toast.error(" Failed to create User Account!")
      return
    }
    set(ref(this.firebase.dbRef, 'users/'+userId),{
      email: emailAddress,
      account_type: "User"
    });

    this.toast.success("User Account Created!")
    this.addForm.reset();
  }

  deleteUser(){
    // console.log("Current ID: " + this.getemailAddress2());
    // if(!this.deleteForm.valid) return;
    //const {deleteAddress} = this.deleteForm.value;
    //let key: any;
    let ID: string;
    //let i = 0;
    //key = {userIdentifier:"userIdentifier", account_type:"userInfo.account_type", email:"userInfo.email"}
    for(let i = 0; i < this.listUsers.length; i++){
      let currUser = this.listUsers[i];
      
      if(currUser.email==this.deleteEmail){
        ID = currUser.userIdentifier;
        console.log("Current ID: " + ID);
        this.firebase.deleteUser(ID)
        //this.authService.
      }
    }
  }

  // deleteCourse(){
  //   this.firebase.deleteProgramme(`${this.currDegree?.name}`)
  // }

}
