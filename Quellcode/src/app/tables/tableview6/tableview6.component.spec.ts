import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableview6Component } from './tableview6.component';

describe('Tableview6Component', () => {
  let component: Tableview6Component;
  let fixture: ComponentFixture<Tableview6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
