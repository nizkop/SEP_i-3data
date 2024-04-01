import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Geburten} from "../Model/geburten";

@Injectable({
  providedIn: 'root'
})
export class Data8Service {
  private apiUrl = 'http://localhost:8080/Datensaetze/table8';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<Geburten[]> {
    return this.http.get<Geburten[]>(this.apiUrl);
  }

  createEntry(entry: Geburten): Observable<Geburten> {
    return this.http.post<Geburten>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: Geburten): Observable<Geburten> {
    return this.http.put<Geburten>(`${this.apiUrl}/update/${entryId}`, entry);
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
