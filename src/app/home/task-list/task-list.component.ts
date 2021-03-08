import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksChangeType } from '../enum/tasks_change_type.enum';
import { UpdateTask } from '../types/task.types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input()
  public title: string = 'Task list Section';

  @Input()
  public tasks: Array<Task>;

  @Output()
  public taskChange: EventEmitter<{
    type: TasksChangeType;
    value: string | Record<string, string>;
  }> = new EventEmitter<{
    type: TasksChangeType;
    value: string | Record<string, string>;
  }>();
  constructor() {}

  ngOnInit(): void {}

  public onSubmitNewTask(description: string) {
    this.taskChange.emit({ type: TasksChangeType.ADD, value: description });
  }

  public onCompleteTask(taskId: string) {
    this.taskChange.emit({ type: TasksChangeType.COMPLETE, value: taskId });
  }

  public onCancelTemp() {
    this.tasks.pop();
  }

  public onUpdateTask(event: UpdateTask) {
    this.taskChange.emit({ type: TasksChangeType.UPDATE, value: event });
  }

  public onRemoveTask(taskId: string) {
    this.taskChange.emit({ type: TasksChangeType.REMOVE, value: taskId });
  }
}
