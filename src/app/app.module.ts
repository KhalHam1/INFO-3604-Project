import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' 
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';

/*const firebaseConfig = {
  apiKey: "AIzaSyAUSEWMqWLzoXRME2YHmvj1H8nTErrJgFI",
  authDomain: "scheduler-authentication.firebaseapp.com",
  projectId: "scheduler-authentication",
  storageBucket: "scheduler-authentication.appspot.com",
  messagingSenderId: "89521061793",
  appId: "1:89521061793:web:9f5930ed00a5bb1a4655e0"
};
const app = initializeApp(firebaseConfig);*/

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    LandingComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatMenuModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    //provideFirebaseApp(() => initializeApp(firebaseConfig)),
    //provideAuth(() => getAuth())
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
//function provideFirebaseApp(arg0: () => import("@firebase/app").FirebaseApp): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  //throw new Error('Function not implemented.');
//}

//function provideAuth(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  //throw new Error('Function not implemented.');
//}

//function getAuth() {
  //throw new Error('Function not implemented.');
//}

