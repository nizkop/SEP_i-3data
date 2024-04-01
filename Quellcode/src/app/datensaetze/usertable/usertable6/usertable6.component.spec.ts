import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { Usertable6Component } from './usertable6.component';
import { UserService } from '../../../services/user.service';
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { testuser } from 'src/app/Model/test/test-user';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('Usertable6Component', () => {
  let component: Usertable6Component;
  let fixture: ComponentFixture<Usertable6Component>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Usertable6Component],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatButtonToggleModule,
        MatIconModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSelectModule,
        MatSortModule,
        MatTooltipModule,
      ],
      providers: [
        // Mocken des UserService
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Usertable6Component);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService); // UserService injizieren

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
