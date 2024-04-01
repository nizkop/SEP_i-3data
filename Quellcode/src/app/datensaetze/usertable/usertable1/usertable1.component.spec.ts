import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usertable1Component } from './usertable1.component';
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
import {testuser} from "../../../Model/test/test-user";
import {ActivatedRoute} from "@angular/router";
import {DownloadbereichComponent} from "../../../downloadbereich/downloadbereich.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('Usertable1Component', () => {
  let component: Usertable1Component;
  let fixture: ComponentFixture<Usertable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable1Component , DownloadbereichComponent],
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
        MatCheckboxModule,
        MatSortModule,
        MatTooltipModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: testuser
              }
            }
          }
        },
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser) // Mock getCurrentUser method
          }
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Usertable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
