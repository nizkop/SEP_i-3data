import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VnNeugeboreneAC } from '../../Model/vn-neugeborene-ac';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/Datensaetze/table1';

  constructor(private http: HttpClient) { }

  getDatensaetze(): Observable<VnNeugeboreneAC[]> {
    return this.http.get<VnNeugeboreneAC[]>(this.apiUrl);
  }

  createEntry(entry: VnNeugeboreneAC): Observable<VnNeugeboreneAC> {
    return this.http.post<VnNeugeboreneAC>(`${this.apiUrl}/add`, entry);
  }

  updateEntry(entryId: number, entry: VnNeugeboreneAC): Observable<VnNeugeboreneAC> {
    return this.http.put<VnNeugeboreneAC>(`${this.apiUrl}/update/${entryId}`, entry);
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
