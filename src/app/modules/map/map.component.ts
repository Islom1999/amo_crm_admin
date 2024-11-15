import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './services/map.service';
import 'leaflet-draw';

export interface IMap {
  type: string
  geometry: Geometry
}

export interface Geometry {
  type: string
  coordinates: number[][]
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  private map: any;
  private drawControl: any;
  private drawnItems: any;

  constructor(private _service: MapService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadData();
    this.loadDrawControls();
  }

  private initMap(): void {
    this.map = L.map('map').setView([41.2995, 69.2401], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems); // Poligonlar va nuqtalarni saqlaydigan layer
  }

  private loadData(): void {
    this._service.getPoints().subscribe((points: any) => {
      points.forEach((point) => {
        L.marker([point.coordinates[1], point.coordinates[0]])
          .addTo(this.map)
          .bindPopup("Point: [" + point.coordinates[1] + ", " + point.coordinates[0] + "]");
      });
    })
    

    this._service.getPolygons().subscribe((polygons: any) => {
      polygons.forEach((polygon) => {
        L.polygon(polygon.coordinates, { color: 'blue' }).addTo(this.map)
          .bindPopup('Poligon ma’lumotlari');
      });
    })
  }

  private loadDrawControls(): void {
    // Chizish uchun kontrollerni yuklash
    this.drawControl = new L.Control.Draw({
      edit: {
        featureGroup: this.drawnItems, // O'zgartirish va o'chirish uchun poligonlar va nuqtalar bu yerda saqlanadi
        remove: true,  // O'chirish imkoniyatini faollashtirish
      },
      draw: {
        polygon: true, // Poligonni chizish
        marker: true,  // Nuqtani chizish
      },
    });
  
    this.map.addControl(this.drawControl);
  
    // Chizilgan obyektlarni saqlash
    this.map.on('draw:created', (event) => {
      const layer = event.layer;
      this.drawnItems.addLayer(layer); // Chizilgan obyektni layerga qo'shish
  
      // Saqlash uchun konsolga chiqarish
      if (layer instanceof L.Polygon) {
        const polygonGeoJSON: IMap = layer.toGeoJSON();
        this._service.addPolygon({type: polygonGeoJSON.type, coordinates: polygonGeoJSON.geometry.coordinates, id: new Date().toDateString()});  // Poligonni qo'shish
      }
      if (layer instanceof L.Marker) {
        const point = layer.getLatLng();
        this._service.addPoint({ type: 'Point', coordinates: [point.lng, point.lat], id: new Date().toDateString() }); // Nuqtani qo'shish
      }
    });
  
    // O'zgartirilgan obyektlarni saqlash
    this.map.on('draw:edited', (event) => {
      event.layers.eachLayer((layer) => {
        if (layer instanceof L.Polygon) {
          const updatedPolygon = layer.toGeoJSON();
          // Poligonni yangilash
          const index = this._service.polygonsSubject.value.findIndex(polygon => polygon.id === updatedPolygon.id);
          this._service.updatePolygon(index, updatedPolygon);
        }
        if (layer instanceof L.Marker) {
          const updatedPoint = { type: 'Point', coordinates: [layer.getLatLng().lng, layer.getLatLng().lat], id: layer.id };
          // Nuqtani yangilash
          const index = this._service.pointsSubject.value.findIndex(point => point.id === updatedPoint.id);
          this._service.updatePoint(index, updatedPoint);
        }
      });
    });
  
    // O'chirilgan obyektlarni saqlash
    this.map.on('draw:deleted', (event) => {
      event.layers.eachLayer((layer) => {
        if (layer instanceof L.Polygon) {
          // Poligonni o'chirish
          const index = this._service.polygonsSubject.value.findIndex(polygon => polygon.id === layer.toGeoJSON().id);
          this._service.deletePolygon(index);
        }
        if (layer instanceof L.Marker) {
          // Nuqtani o'chirish
          const index = this._service.pointsSubject.value.findIndex(point => point.id === layer.getLatLng().id);
          this._service.deletePoint(index);
        }
      });
    });
  }
  
  
}
