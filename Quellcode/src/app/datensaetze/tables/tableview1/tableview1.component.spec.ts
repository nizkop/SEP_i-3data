import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tableview1Component } from './tableview1.component';
import {UserService} from "../../../services/user.service";
import {of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {testuser} from "../../../Model/test/test-user";

describe('TableviewComponent', () => {
  let component: Tableview1Component;
  let fixture: ComponentFixture<Tableview1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview1Component ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
