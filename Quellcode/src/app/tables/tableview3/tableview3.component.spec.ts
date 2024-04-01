import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableview3Component } from './tableview3.component';

describe('Tableview3Component', () => {
  let component: Tableview3Component;
  let fixture: ComponentFixture<Tableview3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableview3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableview3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
