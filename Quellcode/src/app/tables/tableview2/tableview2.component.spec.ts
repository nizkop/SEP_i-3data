import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableview2Component } from './tableview2.component';

describe('Tableview2Component', () => {
  let component: Tableview2Component;
  let fixture: ComponentFixture<Tableview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
