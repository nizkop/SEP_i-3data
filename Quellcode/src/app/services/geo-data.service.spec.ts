import { TestBed } from '@angular/core/testing';
import { GeoDataService } from './geo-data.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserService } from "./user.service";
import { of } from "rxjs";
import {testuser} from "../Model/test/test-user";

describe('GeoDataService', () => {
  let service: GeoDataService;

  beforeEach(async () => { // Hinzufügen von async
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GeoDataService,
        // Mocken des UserService
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
          },
        },
      ],
    }).compileComponents(); // Hinzufügen von compileComponents
    service = TestBed.inject(GeoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
