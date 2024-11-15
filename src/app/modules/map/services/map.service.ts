import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IMapType{
  id: string;
  type: string;
  coordinates: number[][] | number[]
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  polygonsSubject: BehaviorSubject<IMapType[]> = new BehaviorSubject<IMapType[]>([
    {
      'id': '1',
      "type": "Polygon",
      "coordinates": [
        [41.2993, 69.3405],
        [41.3028, 69.3436],
        [41.3041, 69.3407],
        [41.3015, 69.3308],
        [41.2994, 69.3405] // Poligon yopilishi uchun oxirgi nuqta birinchi nuqta bilan bir xil
      ]
    },
    {
      'id': '1',
      "type": "Polygon",
      "coordinates": [
        [41.2995, 69.2401],
        [41.3025, 69.2431],
        [41.3045, 69.2401],
        [41.3010, 69.2370],
        [41.2995, 69.2401] // Poligon yopilishi uchun oxirgi nuqta birinchi nuqta bilan bir xil
      ]
    }
  ]);

  pointsSubject: BehaviorSubject<IMapType[]> = new BehaviorSubject<IMapType[]>([
    {
      'id': '1',
      "type": "Point",
      "coordinates": [69.2411, 41.3005]
    },
    {
      'id': '1',
      "type": "Point",
      "coordinates": [69.2481, 41.3035]
    }
  ]);

  polygons: Observable<IMapType[]> = this.polygonsSubject.asObservable();
  points: Observable<IMapType[]> = this.pointsSubject.asObservable();

  constructor() { }

  getPoints(): Observable<IMapType[]> {
    return this.points
  }

  getPolygons(): Observable<IMapType[]> {
    return  this.polygons
  }

  /// Poligon qo'shishdan oldin koordinatalarni tekshirish
  addPolygon(polygon: IMapType): void {
    if (polygon && polygon.coordinates && polygon.coordinates.length > 0) {
      const currentPolygons = this.polygonsSubject.value;
      this.polygonsSubject.next([...currentPolygons, polygon]);

      console.log(polygon)
    } else {
      console.error('Invalid polygon coordinates:', polygon);
    }
  }

  // Nuqta qo'shishdan oldin koordinatalarni tekshirish
  addPoint(point: IMapType): void {
    if (point && point.coordinates && point.coordinates.length === 2) {
      const currentPoints = this.pointsSubject.value;
      this.pointsSubject.next([...currentPoints, point]);

      console.log(point)
    } else {
      console.error('Invalid point coordinates:', point);
    }
  }

  // Poligonni o'zgartirish
  updatePolygon(index: number, updatedPolygon: IMapType): void {
    const currentPolygons = [...this.polygonsSubject.value];
    currentPolygons[index] = updatedPolygon;
    this.polygonsSubject.next(currentPolygons);

    console.log(index, updatedPolygon)
  }

  // Nuqtani o'zgartirish
  updatePoint(index: number, updatedPoint: IMapType): void {
    const currentPoints = [...this.pointsSubject.value];
    currentPoints[index] = updatedPoint;
    this.pointsSubject.next(currentPoints);

    console.log(index, updatedPoint)
  }

  // Poligonni o'chirish
  deletePolygon(index: number): void {
    const currentPolygons = [...this.polygonsSubject.value];
    currentPolygons.splice(index, 1);
    this.polygonsSubject.next(currentPolygons);
  }

  // Nuqtani o'chirish
  deletePoint(index: number): void {
    const currentPoints = [...this.pointsSubject.value];
    currentPoints.splice(index, 1);
    this.pointsSubject.next(currentPoints);
  }
}
