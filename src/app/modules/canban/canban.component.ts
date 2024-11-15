import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CanbanCardFormComponent } from "./components/canban-card-form/canban-card-form.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CanbanListFormComponent } from './components/canban-list-form/canban-list-form.component';
import { CanbanService, List } from './services/canban.service';
import { Observable } from 'rxjs';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-canban',
  templateUrl: './canban.component.html',
  styleUrl: './canban.component.scss',
  providers: [DialogService]
})
export class CanbanComponent implements OnInit {
  lists!: Observable<List[] >

  $ref: DynamicDialogRef | undefined;
  constructor(
    private $dialogService: DialogService,
    private _service: CanbanService
  ){}

  ngOnInit(): void {
    this.lists = this._service.getLists()
  }

  // Listlarni joy almashtirish funksiyasi
  dropList(event: CdkDragDrop<List[]>) {
    this._service.moveList(event.previousIndex, event.currentIndex);
  }

  // Kartalarni joy almashtirish funksiyasi
  dropCard(event: CdkDragDrop<Card[]>, list: List) {
    const previousContainerId = event.previousContainer.id;
    const currentContainerId = event.container.id;

    if (previousContainerId !== currentContainerId) {
      this._service.moveCard(previousContainerId, currentContainerId, event.previousIndex, event.currentIndex);
    }
  }


  addCard(list: List) {
    // const newCard: Card = { id: new Date().toISOString(),  title: 'New Task', description: 'Task description', date: new Date() };
    // this._service.addCardToList(list.id, newCard);
  }

  addList() {
    const newList: List = { title: 'New list', cards: [], id: new Date().toISOString() };
    this._service.addList(newList);
  }

  showModalList(id?:string) {
    this.$ref = this.$dialogService.open(CanbanListFormComponent, {
      header: id ? "List o'zgartirish" : "List qo'shish",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id}
    });
  }

  showModalCard(parent_id: string, id?:string) {
    this.$ref = this.$dialogService.open(CanbanCardFormComponent, {
      header: id ? "Card o'zgartirish" : "Card qo'shish",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data:{id, parent_id}
    });
  }
}
