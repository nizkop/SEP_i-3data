import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoDatenlistComponent } from './geo-datenlist.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "../services/user.service";
import {of} from "rxjs";
import {testuser} from "../Model/test/test-user";

describe('GeoDatenlistComponent', () => {
  let component: GeoDatenlistComponent;
  let fixture: ComponentFixture<GeoDatenlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoDatenlistComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
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

    fixture = TestBed.createComponent(GeoDatenlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
