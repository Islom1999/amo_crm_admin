import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService<T> {
  private _dataSubject = new BehaviorSubject<T[]>([]);
  private _loadingSubject = new BehaviorSubject<Boolean>(true);
  readonly _data: Observable<T[]> = this._dataSubject.asObservable();
  readonly _loading: Observable<Boolean> = this._loadingSubject.asObservable();

  constructor(protected http: HttpClient, protected apiUrl: string, protected params?: HttpParams) {
    this.loadAll();
  }

  private loadAll(params?: HttpParams) {
    this.http.get<T[]>(`${this.apiUrl}`, { params })
      .pipe(tap(data => {
        this._dataSubject.next(data);
        this._loadingSubject.next(false);
      }))
      .subscribe();
  }

  getAll(params?: HttpParams): Observable<T[]> {
    return this._dataSubject.asObservable();
  }

  getById(id: string | undefined): Observable<T> {
    if (!id) return of(undefined);
    return this._dataSubject.pipe(
      map(data => data.find(item => item['id'] === id))
    );
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, data).pipe(
      tap(newData => {
        const currentData = this._dataSubject.value;
        this._dataSubject.next([newData,...currentData]);
      })
    );
  }

  update(id: string, data: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${id}`, data).pipe(
      tap(updatedData => {
        const currentData = this._dataSubject.value;
        const index = currentData.findIndex(item => item['id'] === id);
        if (index !== -1) {
          currentData[index] = updatedData;
          this._dataSubject.next([...currentData]);
        }
      })
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentData = this._dataSubject.value;
        this._dataSubject.next(currentData.filter(item => item['id'] !== id));
      })
    );
  }

  repair(id: string): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/repair/${id}`, {}).pipe(
      tap(repairedData => {
        const currentData = this._dataSubject.value;
        const index = currentData.findIndex(item => item['id'] === id);
        if (index !== -1) {
          currentData[index] = repairedData;
          this._dataSubject.next([...currentData]);
        }
      })
    );
  }
}
