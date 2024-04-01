// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { TicketDetailsComponent } from './ticket-details.component';
// import {UserService} from "../../services/user.service";
// import {of} from "rxjs";
// import {HttpClientTestingModule} from "@angular/common/http/testing";
// import {MatCardModule} from "@angular/material/card";
// import {MatPaginatorModule} from "@angular/material/paginator";
// import {MatTableModule} from "@angular/material/table";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {User} from "../../Model/user";
// import {UserRole} from "../../Model/userrole";
// import {ActivatedRoute} from "@angular/router";
//
// describe('TicketDetailsComponent', () => {
//   let component: TicketDetailsComponent;
//   let fixture: ComponentFixture<TicketDetailsComponent>;
//
//   beforeEach(async () => {
//     const user: User = {
//       id: 0,
//       firstName: 'Vorname',
//       lastName: 'Nachname',
//       userName: 'Nutzername',
//       favData: '',
//       email: 'admin@mail.com',
//       password: 'password',
//       role: UserRole.ADMIN,
//       birthDate: '01.01.2000',
//       prfPicture: '',
//     };
//
//     await TestBed.configureTestingModule({
//       declarations: [ TicketDetailsComponent ],
//       imports: [
//         HttpClientTestingModule,
//         MatCardModule,
//       ],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               data: {
//                 user: user
//               }
//             }
//           }
//         },
//         {
//           provide: UserService,
//           useValue: {
//             getCurrentUser: () => of(user) // Mock getCurrentUser method
//           }
//         }
//       ],
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(TicketDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
