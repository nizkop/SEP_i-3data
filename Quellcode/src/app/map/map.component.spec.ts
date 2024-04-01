import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../services/user.service";
import {of} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {testuser} from "../Model/test/test-user";


describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [HttpClientTestingModule, MatCardModule],
      providers: [
        // Mocken des UserService
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
