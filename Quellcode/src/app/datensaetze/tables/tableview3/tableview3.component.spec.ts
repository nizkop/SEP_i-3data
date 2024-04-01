import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tableview3Component } from './tableview3.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "../../../services/user.service";
import {of} from "rxjs";
import {testuser} from "../../../Model/test/test-user";

describe('Tableview3Component', () => {
  let component: Tableview3Component;
  let fixture: ComponentFixture<Tableview3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview3Component ],
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

    fixture = TestBed.createComponent(Tableview3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
