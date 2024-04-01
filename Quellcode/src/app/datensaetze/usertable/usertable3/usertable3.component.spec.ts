import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usertable3Component } from './usertable3.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "../../../services/user.service";
import {of} from "rxjs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { testuser } from 'src/app/Model/test/test-user';
import {DownloadbereichComponent} from "../../../downloadbereich/downloadbereich.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('Usertable3Component', () => {
  let component: Usertable3Component;
  let fixture: ComponentFixture<Usertable3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable3Component , DownloadbereichComponent],
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

    fixture = TestBed.createComponent(Usertable3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
