import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Place } from '../../models/wefox-place.model';

@Injectable({
  providedIn: 'root',
})
export class WefoxRESTService {
  private wefoxApiUrl = 'http://localhost:3000/api/v1/posts'; // URL to wefox api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET List from the server */
  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.wefoxApiUrl).pipe(
      tap((_) => console.log('fetched List')),
      catchError(this.handleError<Place[]>('getPlace', []))
    );
  }

  /** GET places by id. Will 404 if id not found */
  getPlace(id: number): Observable<Place> {
    const url = `${this.wefoxApiUrl}/${id}`;
    return this.http.get<Place>(url).pipe(
      tap((_) => console.log(`fetched id=${id}`)),
      catchError(this.handleError<Place>(`getPlace id=${id}`))
    );
  }

  /** POST: add a new place to the server */
  addPlace(place: Place): Observable<Place> {
    return this.http
      .post<Place>(this.wefoxApiUrl, place, this.httpOptions)
      .pipe(
        tap((newPlace: Place) =>
          console.log(`added place w/ id=${newPlace.id}`)
        ),
        catchError(this.handleError<Place>('addPlace'))
      );
  }

  /** PUT: update the place on the server */
  updatePlace(place: Place): Observable<any> {
    const url = `${this.wefoxApiUrl}/${place.id}`;
    return this.http.put(url, place, this.httpOptions).pipe(
      tap((_) => console.log(`updated place id=${place.id}`)),
      catchError(this.handleError<any>('updatePlace'))
    );
  }

  /** DELETE: delete the place from the server */
  deletePlace(id: number): Observable<Place> {
    const url = `${this.wefoxApiUrl}/${id}`;

    return this.http.delete<Place>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted place id=${id}`)),
      catchError(this.handleError<Place>('deletePlace'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
