import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomComponent } from './bottom.component';

describe('bottomComponent', () => {
  let component: BottomComponent;
  let fixture: ComponentFixture<BottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
