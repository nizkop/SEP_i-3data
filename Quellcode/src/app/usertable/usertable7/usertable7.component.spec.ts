import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usertable7Component } from './usertable7.component';

describe('Usertable7Component', () => {
  let component: Usertable7Component;
  let fixture: ComponentFixture<Usertable7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usertable7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
