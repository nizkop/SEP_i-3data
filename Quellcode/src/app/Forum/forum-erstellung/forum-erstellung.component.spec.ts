import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumErstellungComponent } from './forum-erstellung.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

describe('ForumErstellungComponent', () => {
  let component: ForumErstellungComponent;
  let fixture: ComponentFixture<ForumErstellungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumErstellungComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumErstellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
