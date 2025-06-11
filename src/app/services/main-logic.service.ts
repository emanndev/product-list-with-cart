import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Dessert } from '../../model/dessert.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainLogicService {
  private dataUrl = 'data.json';

  constructor(private http: HttpClient) {}

  //added error handling to the getD
  getDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(this.dataUrl).pipe(
      catchError((error) => {
        console.error('Error fetching desserts:', error);
        return throwError(() => new Error('Failed to load desserts'));
      })
    );
  }
}
