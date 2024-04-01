import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsertableComponent } from './usertable.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {testuser} from "../../Model/test/test-user";

describe('UsertableComponent', () => {
  let component: UsertableComponent;
  let fixture: ComponentFixture<UsertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertableComponent ],
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
        MatSelectModule
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

    fixture = TestBed.createComponent(UsertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
