import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usertable3Component } from './usertable3.component';

describe('Usertable3Component', () => {
  let component: Usertable3Component;
  let fixture: ComponentFixture<Usertable3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usertable3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
