import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableview7Component } from './tableview7.component';

describe('Tableview7Component', () => {
  let component: Tableview7Component;
  let fixture: ComponentFixture<Tableview7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
