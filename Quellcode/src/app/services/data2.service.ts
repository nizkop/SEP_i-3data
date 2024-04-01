import { Injectable } from '@angular/core';
import {Sterbefaelle} from '../Model/sterbefaelle'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Data2Service {
  private apiUrl = 'http://localhost:8080/Datensaetze/table2';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<Sterbefaelle[]> {
    return this.http.get<Sterbefaelle[]>(this.apiUrl);
  }

  createEntry(entry: Sterbefaelle): Observable<Sterbefaelle> {
    return this.http.post<Sterbefaelle>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: Sterbefaelle): Observable<Sterbefaelle> {
    return this.http.put<Sterbefaelle>(`${this.apiUrl}/update/${entryId}`, entry);
  }

  deleteEntry(entryId: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/delete/${entryId}`);
  }
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, {responseType: 'text'});
  }
}
