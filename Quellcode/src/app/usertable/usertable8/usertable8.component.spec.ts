import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usertable8Component } from './usertable8.component';

describe('Usertable8Component', () => {
  let component: Usertable8Component;
  let fixture: ComponentFixture<Usertable8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usertable8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
