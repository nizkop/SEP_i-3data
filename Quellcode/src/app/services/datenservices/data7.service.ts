import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Strassenliste} from "../../Model/strassenliste";

@Injectable({
  providedIn: 'root'
})
export class Data7Service {
  private apiUrl = 'http://localhost:8080/Datensaetze/table7';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<Strassenliste[]> {
    return this.http.get<Strassenliste[]>(this.apiUrl);
  }

  createEntry(entry: Strassenliste): Observable<Strassenliste> {
    return this.http.post<Strassenliste>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: Strassenliste): Observable<Strassenliste> {
    return this.http.put<Strassenliste>(`${this.apiUrl}/update/${entryId}`, entry);
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
