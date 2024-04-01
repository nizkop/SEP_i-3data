import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Arbeitssuchende} from "../Model/arbeitssuchende";

@Injectable({
  providedIn: 'root'
})
export class Data3Service {
  private apiUrl = 'http://localhost:8080/Datensaetze/table3';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<Arbeitssuchende[]> {
    return this.http.get<Arbeitssuchende[]>(this.apiUrl);
  }

  createEntry(entry: Arbeitssuchende): Observable<Arbeitssuchende> {
    return this.http.post<Arbeitssuchende>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: Arbeitssuchende): Observable<Arbeitssuchende> {
    return this.http.put<Arbeitssuchende>(`${this.apiUrl}/update/${entryId}`, entry);
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
