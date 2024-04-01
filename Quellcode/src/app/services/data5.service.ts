import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import{MittlereJahresBevoelkerung} from "../Model/mittlerejahresbev";

@Injectable({
  providedIn: 'root'
})
export class Data5Service {
  private apiUrl = 'http://localhost:8080/Datensaetze/table5';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<MittlereJahresBevoelkerung[]> {
    return this.http.get<MittlereJahresBevoelkerung[]>(this.apiUrl);
  }

  createEntry(entry: MittlereJahresBevoelkerung): Observable<MittlereJahresBevoelkerung> {
    return this.http.post<MittlereJahresBevoelkerung>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: MittlereJahresBevoelkerung): Observable<MittlereJahresBevoelkerung> {
    return this.http.put<MittlereJahresBevoelkerung>(`${this.apiUrl}/update/${entryId}`, entry);
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
