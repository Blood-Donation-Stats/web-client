import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from '../model/pageable';
import {User} from '../model/user';
import {tap} from 'rxjs/operators';


const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_BASE = 'http://localhost:8080/user-service/users';

  constructor(private http: HttpClient) { }

  get(sort: string, order: string, page: number, pageSize: number): Observable<Pageable<User>> {
    const URL = `${this.URL_BASE}?sort=${sort},${order}&page=${page}&size=${pageSize}`;
    return this.http.get<Pageable<User>>(URL);
  }

  postNewDonor(user: User): Observable<User> {
    return this.http.post<User>(this.URL_BASE, user, httpHeaders);
  }

  putNewDonor(user: User): Observable<User> {
    return this.http.put<User>(this.URL_BASE, user, httpHeaders);
  }

  deleteDonor(id: number): Observable<User> {
    const URL = `${this.URL_BASE}/${id}`;
    return this.http.delete<User>(URL);
  }
}
