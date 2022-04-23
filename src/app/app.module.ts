
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import {  CalendarModal } from './layouts/calendarModal/calendarModal.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';


import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FirebaseDBServiceService } from './services/firebase-dbservice.service';
import { PromptDialogComponent } from './layouts/prompt-dialog/prompt-dialog.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { HotToastModule } from '@ngneat/hot-toast';
import { LoginComponent } from './layouts/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgrammeComponent } from './layouts/programme/programme.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProgrammeModalComponent } from './layouts/programme-modal/programme-modal.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CoursesComponent } from './layouts/courses/courses.component';
import { CourseModalComponent } from './layouts/courses-modal/course-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    SpinnerComponent,
    CalendarModal,
    PromptDialogComponent,
    LoginComponent,
    ProgrammeComponent,
    ProgrammeModalComponent,
    AdminComponent,
    CoursesComponent,
    CourseModalComponent,ProgrammeModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    FirebaseDBServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
