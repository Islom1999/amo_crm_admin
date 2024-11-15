import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { IPagination } from '../../../interfaces/pagination';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService<T> {
  private _dataSubject = new BehaviorSubject<T[]>([]);
  private _loadingSubject = new BehaviorSubject<Boolean>(true);
  readonly _data: Observable<T[]> = this._dataSubject.asObservable();
  readonly _loading: Observable<Boolean> = this._loadingSubject.asObservable()
  private _paramsSubject = new BehaviorSubject<HttpParams>(new HttpParams());
  readonly _params: Observable<HttpParams> = this._paramsSubject.asObservable();
  // _params:HttpParams = new HttpParams()

  constructor(protected http: HttpClient, protected apiUrl: string) {
    this.loadAll()
  }

  loadAll() {
    this.http.get<T[]>(`${this.apiUrl}`, { params: this._paramsSubject.value })
      .pipe(
        tap(data => {
          this._dataSubject.next(data);
          this._loadingSubject.next(false);
        })
      )
      .subscribe(); 
  }

  updateParams(params: HttpParams) {
    this._paramsSubject.next(params);
    this.loadAll();
  }

  getParams(): HttpParams {
    return this._paramsSubject.value;
  }



  // @Cacheable()
  getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`, { params: this._paramsSubject.value });
  }

  // @Cacheable()
  getAllPanination(params?: HttpParams): Observable<IPagination<T[]>> {
    return this.http.get<IPagination<T[]>>(`${this.apiUrl}/pagination`, {
      params,
    });
  }

  // @Cacheable()
  getById(id: string | undefined): Observable<T> {
    if(!id) return of()
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, data).pipe(
      tap(() => {
        this.loadAll()
      })
    );
  }

  update(id: string, data: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${id}`, data).pipe(
      tap(() => {
        this.loadAll()
      }),
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadAll()
      }),
    );
  }

  repair(id: string): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/repair/${id}`, {}).pipe(
      tap(() => {
        this.loadAll()
      }),
    );
  }
}
