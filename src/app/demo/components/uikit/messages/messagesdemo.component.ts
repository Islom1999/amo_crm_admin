import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
    templateUrl: './messagesdemo.component.html',
    providers: [MessageService]
})
export class MessagesDemoComponent {

    msgs: Message[] = [];

    constructor(private service: MessageService) { }

    showInfoViaToast() {
        this.service.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    }

    showWarnViaToast() {
        this.service.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showErrorViaToast() {
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    showSuccessViaToast() {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    }

    showInfoViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    }

    showWarnViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showErrorViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }

    showSuccessViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
    }




    // KANBAN

    boards: any[];

  ngOnInit(): void {
    this.boards = [
      {
        name: 'Backlog',
        tasks: [
          {
            title: 'Qualitative research planning',
            description: "Hey there, we're just writing to let you know",
            avatars: ['assets/avatar1.png', 'assets/avatar2.png', 'assets/avatar3.png'],
            date: 'May 18'
          },
          {
            title: 'Create new components',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            avatars: ['assets/avatar4.png', 'assets/avatar5.png'],
            date: 'May 22'
          }
        ]
      },
      {
        name: 'In Progress',
        tasks: [
          {
            title: 'Qualitative research planning',
            description: "Hey there, we're just writing to let you know",
            avatars: ['assets/avatar1.png'],
            date: 'May 22'
          },
          {
            title: 'Culpa qui officia',
            description: "Culpa qui officia deserunt mollit anim id est laborum",
            avatars: ['assets/avatar2.png', 'assets/avatar3.png', 'assets/avatar4.png'],
            date: 'May 26'
          }
        ]
      },
      {
        name: 'Completed',
        tasks: [
          {
            title: 'Create new components',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            avatars: ['assets/avatar1.png', 'assets/avatar2.png'],
            date: 'May 25'
          }
        ]
      }
    ];
  }

  drop(event: CdkDragDrop<any[]>): void {
    console.log(event)
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.item.data.boardIndex != null && event.previousContainer.data && event.container.data) {
      // Move task between boards
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    } else if (event.item.data.index != null) {
      // Move board
      moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    }
  }
  
  addBoard(): void {
    this.boards.push({
      name: 'New Board',
      tasks: []
    });
  }
    
}
