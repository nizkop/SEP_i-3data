import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AnsichtsartPopup } from '../../../Model/ansichtsartPopup';
import { Diagrammodel } from '../../../Model/Diagrammodel';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            diagramData: [
              { name: 'Data 1', zahl: 10 },
              { name: 'Data 2', zahl: 20 },
              { name: 'Data 3', zahl: 40 },
            ] as Diagrammodel[],
            ansicht: AnsichtsartPopup.SAVE,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have non-empty diagramData', () => {
    expect(component.data.diagramData.length).toBeGreaterThan(0);
  });

  it('should create an SVG element', () => {
    const svgElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement).toBeTruthy();
  });




});
