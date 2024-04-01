import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFAComponent } from './two-fa.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Data2Service} from "../../services/datenservices/data2.service";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TwoFAComponent', () => {
  let component: TwoFAComponent;
  let fixture: ComponentFixture<TwoFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoFAComponent ],
      imports: [HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
