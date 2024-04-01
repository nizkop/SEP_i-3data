import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableview8Component } from './tableview8.component';

describe('Tableview8Component', () => {
  let component: Tableview8Component;
  let fixture: ComponentFixture<Tableview8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
