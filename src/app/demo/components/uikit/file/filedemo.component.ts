import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './filedemo.component.html',
    providers: [MessageService]
})
export class FileDemoComponent {

    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }


//  KANBAN

  backlog: any[];
  inProgress: any[];
  completed: any[];

  ngOnInit(): void {
    this.backlog = [
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
    ];

    this.inProgress = [
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
    ];

    this.completed = [
      {
        title: 'Create new components',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatars: ['assets/avatar1.png', 'assets/avatar2.png'],
        date: 'May 25'
      }
    ];
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
