import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usertable6Component } from './usertable6.component';

describe('Usertable6Component', () => {
  let component: Usertable6Component;
  let fixture: ComponentFixture<Usertable6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usertable6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
