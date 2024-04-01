import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertableComponent } from './usertable.component';

describe('UsertableComponent', () => {
  let component: UsertableComponent;
  let fixture: ComponentFixture<UsertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
