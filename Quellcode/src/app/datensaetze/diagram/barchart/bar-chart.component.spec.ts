import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AnsichtsartPopup } from '../../../Model/ansichtsartPopup';
import { Diagrammodel } from '../../../Model/Diagrammodel';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            diagramData: [
              { name: 'Data 1', zahl: 10 },
              { name: 'Data 2', zahl: 20 },
              { name: 'Data 3', zahl: 30 },
            ] as Diagrammodel[],
            ansicht: AnsichtsartPopup.SAVE,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have non-empty diagramData', () => {
    expect(component.data.diagramData.length).toBeGreaterThan(0);
    const barElements = fixture.nativeElement.querySelectorAll('rect');
    expect(barElements.length).toEqual(component.data.diagramData.length);
  });

  it('should create an SVG element', () => {
    const svgElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement).toBeTruthy();
  });

  it('should create bars with correct size', () => {
    // Herausfinden der Soll-Werte:
    const barElements = <any>fixture.nativeElement.querySelectorAll('rect');
    let maxBarIndex = -1;
    let maxValue = -Infinity;
    let minBarIndex = -1;
    let minValue = Infinity;

    component.data.diagramData.forEach((entry: any, index: number) => {
      if (entry.zahl > maxValue) {
        maxValue = entry.zahl;
        maxBarIndex = index;
      }
      if (entry.zahl < minValue) {
        minValue = entry.zahl;
        minBarIndex = index;
      }
    });
    // Herausfinden der Balken-Ist-Werte:
    let maxBarHeight = -Infinity;
    let maxBarIndexFound = -1;
    let minBarHeight = Infinity;
    let minBarIndexFound = -1;

    barElements.forEach((barElement: any, index: number) => {
      const barHeight = parseFloat(barElement.getAttribute('height'));
      if (barHeight > maxBarHeight) {
        maxBarHeight = barHeight;
        maxBarIndexFound = index;
      }
      if (barHeight < minBarHeight) {
        minBarHeight = barHeight;
        minBarIndexFound = index;
      }
    });
    // Kontrolle:
    // console.log("-> Max ID:", maxBarIndexFound);
    // console.log("-> Min ID:", minBarIndexFound);
    expect(maxBarIndexFound).toEqual(maxBarIndex);
    expect(minBarIndexFound).toEqual(minBarIndex);
  });

});



