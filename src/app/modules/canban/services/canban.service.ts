import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

export interface Card {
  id: string;
  title: string;
  description: string;
  date: Date;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}

@Injectable({
  providedIn: 'root'
})
export class CanbanService {

  private listsSubject: BehaviorSubject<List[]> = new BehaviorSubject<List[]>([
    {
      id: '1', // Har bir ro'yxat uchun ID
      title: 'Backlog',
      cards: [
        { id: '1', title: 'Qualitative research planning', description: 'Hey there, we’re just writing to let you know', date: new Date('2023-05-18') },
        { id: '2', title: 'Create new components', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: new Date('2023-05-22') }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      cards: [
        { id: '3', title: 'Qualitative research planning', description: 'Hey there, we’re just writing to let you know', date: new Date('2023-05-22') },
      ]
    },
    {
      id: '3',
      title: 'Completed',
      cards: []
    }
  ]);

  lists$: Observable<List[]> = this.listsSubject.asObservable();

  constructor() { }

  // Barcha ro'yxatlarni olish
  getLists(): Observable<List[]> {
    return this.lists$
  }

  getByIdList(id: string) {
    const currentLists = this.listsSubject.value;
    return of(currentLists.find(list => list.id === id));
  }


  getByIdCard(id: string){
    const currentLists = this.listsSubject.value; // Barcha listlarni olish
    for (const list of currentLists) {
        const card = list.cards.find(card => card.id === id); // Har bir listdagi kartalarni tekshirish
        if (card) {
            return of(card); // `id` orqali mos kartani topish
        }
    }
    return of(); // Agar mos karta topilmasa, `undefined` qaytarish
  }

  addList(newList: List) {
    const currentLists = this.listsSubject.value;
    this.listsSubject.next([...currentLists, newList]);
    return of(newList)
  }

  updateList(id:string, updatedList: List) {
    const currentLists = this.listsSubject.value;
    const updatedLists = currentLists.map(list =>
        list.id === id ? {...list, title: updatedList.title} : list // ID bo'yicha yangilanish
    );
    this.listsSubject.next(updatedLists); // Yangilangan listlar ro'yxatini yangilash
    return of(updatedList)
  } 

  addCardToList(listId: string, newCard: Card) {
    const currentLists = this.listsSubject.value.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [newCard, ...list.cards]
        };
      }
      return list;
    });
    this.listsSubject.next(currentLists); // Yangilangan listlarni yangilash
    return of(newCard); // Observable qaytarish
  }

  updateCardInList(listId: string, cardId: string, updatedCard: Card) {
      const currentLists = this.listsSubject.value.map(list => {
        if (list.id === listId) {
          const updatedCards = list.cards.map(card =>
            card.id === cardId ? { ...card, ...updatedCard } : card // ID bo'yicha yangilanish
          );
          return { ...list, cards: updatedCards }; // Yangilangan kartalarni qaytarish
        }
        return list;
      });
      this.listsSubject.next(currentLists); // Yangilangan listlarni yangilash
      return of(updatedCard); // Observable qaytarish
  }

  moveList(previousIndex: number, currentIndex: number) {
    const currentLists = this.listsSubject.value;
    moveItemInArray(currentLists, previousIndex, currentIndex);
    this.listsSubject.next(currentLists);
  }

  moveCard(previousListId: string, currentListId: string, previousIndex: number, currentIndex: number) {
    const currentLists = this.listsSubject.value;  // Bu yerda mavjud listlarni olamiz
    const previousList = currentLists.find(list => list.id === previousListId);
    const currentList = currentLists.find(list => list.id === currentListId);

    if (previousList && currentList) {
      console.log("Moving card from list", previousListId, "to list", currentListId);

      // Agar bir xil list ichida joy almashsa
      if (previousListId === currentListId) {
        moveItemInArray(previousList.cards, previousIndex, currentIndex);
      } else {
        // Agar boshqa listga ko'chsa
        transferArrayItem(
          previousList.cards,
          currentList.cards,
          previousIndex,
          currentIndex
        );
      }

      // O'zgartirilgan currentLists ni ko'rsating
      this.listsSubject.next(currentLists);  // Bu yerda yangilangan ma'lumotni emit qilamiz
    } else {
      console.log("Lists not found: ", previousList, currentList);
    }
  }


}
