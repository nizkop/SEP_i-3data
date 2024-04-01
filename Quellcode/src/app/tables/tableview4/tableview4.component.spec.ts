import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableview4Component } from './tableview4.component';

describe('Tableview4Component', () => {
  let component: Tableview4Component;
  let fixture: ComponentFixture<Tableview4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
