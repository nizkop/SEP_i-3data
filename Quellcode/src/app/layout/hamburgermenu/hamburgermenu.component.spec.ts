import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HamburgermenuComponent } from './hamburgermenu.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from "@angular/material/list";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {testuser} from "../../Model/test/test-user";

describe('HamburgermenuComponent', () => {
  let component: HamburgermenuComponent;
  let fixture: ComponentFixture<HamburgermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamburgermenuComponent ],
      imports: [HttpClientTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        RouterModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: testuser
              }
            }
          }
        },
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser) // Mock getCurrentUser method
          }
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
