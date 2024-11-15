import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import * as L from 'leaflet';
import 'leaflet-draw';
import { IMap } from '../map/map.component';
import { MapService } from '../map/services/map.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent {
  private map: any;
  private drawControl: any;
  private drawnItems: any;


  productDialog: boolean = false;

  products!: any[];

  product!: any;

  selectedProducts!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private _service: MapService
  ) {}

  ngAfterViewInit(): void {
    
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
  onDialogShow() {
    if (!this.map) {  // Initialize map only once
      this.initMap();
      this.loadDrawControls();
    }

    setTimeout(() => {
      this.map?.invalidateSize();  // Ensure map re-renders correctly
    }, 0);
  }
  onDialogHide() {
    if (this.map) {
      this.map.remove();  // Clean up the map instance
      this.map = undefined;  // Set map to undefined to allow reinitialization
    }
  }

  ngOnInit() {
      this.products = [
        {
          id: '1000',
          name: 'Samarqand',
          description: 'Samarqand Viloyati',
        },
        {
          id: '1001',
          name: 'Toshkent',
          description: 'Toshkent Viloyati',
        },
        {
          id: '1002',
          name: 'Jizzax',
          description: 'Jizzax Viloyati',
        }
      ]
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
              this.selectedProducts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  editProduct(product: any) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => val.id !== product.id);
              this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name?.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
}
