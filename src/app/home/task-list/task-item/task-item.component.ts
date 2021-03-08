import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCheck,
  faEdit,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { Task } from '../../../models/task.model';
import { UpdateTask } from '../../types/task.types';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input()
  public task: Task;

  @Output()
  public complete: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public add: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public update: EventEmitter<UpdateTask> = new EventEmitter<UpdateTask>();

  @Output()
  public cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public remove: EventEmitter<string> = new EventEmitter<string>();

  public newDescription: string;

  public editIcon = faEdit;
  public removeIcon = faTrash;

  public confirmIcon = faCheck;
  public cancelIcon = faTimes;

  public isEditing = false;

  constructor() {}

  ngOnInit(): void {}

  public onChangeComplete() {
    this.complete.emit(this.task._id);
  }

  public onSubmit() {
    if (this.task._id) {
      this.update.emit({taskId: this.task._id, description: this.newDescription});
      this.task.description = this.newDescription;
      this.onActiveEditing(false);
    } else {
      this.add.emit(this.newDescription);
    }
  }

  public onCancelTemp() {
    if (this.isEditing) {
      this.onActiveEditing(false);
    } else {
      this.cancel.emit(true);
    }
  }

  public onActiveEditing(value: boolean) {
    this.isEditing = value;
    this.newDescription = this.task.description;
  }

  public onRemove() {
    this.remove.emit(this.task._id);
  }
}
