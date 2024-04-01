import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeMapComponent } from './tree-map.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AnsichtsartPopup } from '../../../Model/ansichtsartPopup';
import { Diagrammodel } from '../../../Model/Diagrammodel';

describe('TreeMapComponent', () => {
  let component: TreeMapComponent;
  let fixture: ComponentFixture<TreeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeMapComponent],
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

    fixture = TestBed.createComponent(TreeMapComponent);
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

  it('should create rectangles for each data item', () => {
    const rectElements = fixture.nativeElement.querySelectorAll('rect');
    expect(rectElements.length).toEqual(component.data.diagramData.length);
  });

 it('should create text elements for each data item', () => {
    const textElements = fixture.nativeElement.querySelectorAll('text');
    console.log("textElements", textElements);

    component.data.diagramData.forEach((entry: any, index: number) => {
      const name = entry.name;
      const targetIndex = index * 2; // Überspringe 1 Element von diagramData

      if (targetIndex < textElements.length) {
        const targetTextElement = textElements[targetIndex];
        const textContent = targetTextElement.textContent || '';
        expect(textContent.includes(name)).toBeTruthy(`Name "${name}" not found in textElements[${targetIndex}].`);
      }
    });
  });

});
