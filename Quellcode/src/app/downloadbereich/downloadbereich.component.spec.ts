import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadbereichComponent } from './downloadbereich.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";

describe('DownloadbereichComponent', () => {
  let component: DownloadbereichComponent;
  let fixture: ComponentFixture<DownloadbereichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadbereichComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
        MatCheckboxModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadbereichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial checkbox values and downloadActive set to false', () => {
    expect(component.checkboxes).toEqual({
      'Balkendiagramm': true,
      'Treemap': true,
      'Kuchendiagramm': true
    });
    expect(component.balkendiagramm).toBe(false);
    expect(component.treemap).toBe(false);
    expect(component.kuchendiagramm).toBe(false);

    expect(component.downloadActive).toBe(false);
  });

  it('should activate specified diagram types and set downloadActive to true', () => {
    component.setActive(true, true, true); // 1x alle Werte ändern
    expect(component.balkendiagramm).toBe(true);
    expect(component.treemap).toBe(true);
    expect(component.kuchendiagramm).toBe(true);

    expect(component.downloadActive).toBe(true);
  });

  it('should not change activated diagram types when setActive with false', () => {
    component.setActive(false, false, false); // 1x alle Werte ändern
    expect(component.balkendiagramm).toBe(false);
    expect(component.treemap).toBe(false);
    expect(component.kuchendiagramm).toBe(false);
    expect(component.downloadActive).toBe(true);
  });

});
