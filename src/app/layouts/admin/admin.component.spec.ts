import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseDBServiceService } from 'src/app/services/firebase-dbservice.service';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';

import { AdminComponent } from './admin.component';
import { environment } from 'src/environments/environment';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { AppRoutes } from 'src/app/app.routing';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        HotToastModule.forRoot(),
        RouterModule.forRoot(AppRoutes), MatTableModule,  ReactiveFormsModule, FormsModule, MatFormFieldModule, MatIconModule
      ],
      declarations: [ AdminComponent,SpinnerComponent ],
      providers: [
         FirebaseDBServiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    //expect(true).toBeTrue()
  });
});
