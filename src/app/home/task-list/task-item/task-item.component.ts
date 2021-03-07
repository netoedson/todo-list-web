import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input()
  public task: Task;

  @Output()
  public complete: EventEmitter<{taskId: string}> = new EventEmitter<{taskId: string}>();

  @Output()
  public submit: EventEmitter<{description: string}> = new EventEmitter<{description: string}>()

  constructor() { }

  ngOnInit(): void {
  }

  onChangeComplete() {
    this.complete.emit({taskId: this.task._id})
  }

  onSubmit() {
    this.submit.emit({description: this.task.description})
  }

}
