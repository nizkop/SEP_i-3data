import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderboxComponent } from './headerbox.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {testuser} from "../../Model/test/test-user";

describe('HeaderboxComponent', () => {
  let component: HeaderboxComponent;
  let fixture: ComponentFixture<HeaderboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderboxComponent ],
      imports: [HttpClientTestingModule,
        MatDialogModule,
        MatIconModule
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

    fixture = TestBed.createComponent(HeaderboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
