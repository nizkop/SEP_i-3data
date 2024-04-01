import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usertable4Component } from './usertable4.component';

describe('Usertable4Component', () => {
  let component: Usertable4Component;
  let fixture: ComponentFixture<Usertable4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usertable4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usertable4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
