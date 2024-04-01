import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketErstellungComponent } from './ticket-erstellung.component';
import { UserService } from "../../services/user.service";
import { of } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { testuser } from "../../Model/test/test-user";
import { FormsModule } from '@angular/forms';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TicketErstellungComponent', () => {
  let component: TicketErstellungComponent;
  let fixture: ComponentFixture<TicketErstellungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketErstellungComponent],
      imports: [HttpClientTestingModule, MatCardModule, FormsModule],
      providers: [
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
          },
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketErstellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit ticket', () => {
    component.betreff = 'Dummy Betreff';
    component.nachricht = 'Dummy Nachricht';
    component.selectedOption = 'Fehler im Datensatz';
    component.submit();

    console.log("Fehlermeldung: ", component.fehlermeldung);
    expect(component.fehlermeldung).toEqual('');
  });


  it('should display error message if fields are empty', () => {
    component.betreff = '';
    component.nachricht = '';
    component.selectedOption = '';
    component.submit();

    console.log("Fehlermeldung: ", component.fehlermeldung);
    expect(component.fehlermeldung).toEqual('Bitte füllen Sie alle Felder aus!');
  });




});
