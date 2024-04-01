import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usertable5Component } from './usertable5.component';

describe('Usertable5Component', () => {
  let component: Usertable5Component;
  let fixture: ComponentFixture<Usertable5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usertable5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
