import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadUebersichtComponent } from './thread-uebersicht.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";

describe('ThreadUebersichtComponent', () => {
  let component: ThreadUebersichtComponent;
  let fixture: ComponentFixture<ThreadUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadUebersichtComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
