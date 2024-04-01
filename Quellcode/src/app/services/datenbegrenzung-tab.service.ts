import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Injectable({
  providedIn: 'root'
})
export class DatenbegrenzungTabService extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Einträge pro Seite';
  override nextPageLabel = 'Nächste Seite';
  override previousPageLabel = 'Vorherige Seite';
  override firstPageLabel = 'Erste Seite';
  override lastPageLabel = 'Letzte Seite';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    const startIndex = page * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, length);
    return `${startIndex} - ${endIndex} von ${length}`;
  };
}
