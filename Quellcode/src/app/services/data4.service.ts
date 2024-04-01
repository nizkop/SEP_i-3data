import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Arbeitslose} from "../Model/arbeitslose";

@Injectable({
  providedIn: 'root'
})
export class Data4Service {
  private apiUrl = 'http://localhost:8080/Datensaetze/table4';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<Arbeitslose[]> {
    return this.http.get<Arbeitslose[]>(this.apiUrl);
  }

  createEntry(entry: Arbeitslose): Observable<Arbeitslose> {
    return this.http.post<Arbeitslose>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: Arbeitslose): Observable<Arbeitslose> {
    return this.http.put<Arbeitslose>(`${this.apiUrl}/update/${entryId}`, entry);
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
