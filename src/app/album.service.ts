import { Album } from './album';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  url = 'https://localhost:44340/api/Album';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Album[]> {
    return this.http.get<Album[]>(this.url);
  }

  get(id: number): Observable<Album> {
    const apiurl = `${this.url}/${id}`;
    return this.http.get<Album>(apiurl);
  }

  post(album: Album): Observable<Album> {
    debugger
    return this.http.post<Album>(this.url, album, httpOptions);
  }

  put(id: number, album: Album): Observable<Album> {
    const apiurl = this.url + '/' + id;
    return this.http.put<Album>(apiurl, album, httpOptions);
  }

  delete(id: string): Observable<number> {
    return this.http.delete<number>(this.url + '/' + id, httpOptions);
  }
}
