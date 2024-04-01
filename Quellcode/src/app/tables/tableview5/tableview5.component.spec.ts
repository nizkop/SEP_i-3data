import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableview5Component } from './tableview5.component';

describe('Tableview5Component', () => {
  let component: Tableview5Component;
  let fixture: ComponentFixture<Tableview5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
