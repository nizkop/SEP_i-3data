import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Privathaushalte} from "../Model/privathaushalte";

@Injectable({
  providedIn: 'root'
})
export class Data6Service {
  private apiUrl = 'http://localhost:8080/Datensaetze/table6';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<Privathaushalte[]> {
    return this.http.get<Privathaushalte[]>(this.apiUrl);
  }

  createEntry(entry: Privathaushalte): Observable<Privathaushalte> {
    return this.http.post<Privathaushalte>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: Privathaushalte): Observable<Privathaushalte> {
    return this.http.put<Privathaushalte>(`${this.apiUrl}/update/${entryId}`, entry);
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
