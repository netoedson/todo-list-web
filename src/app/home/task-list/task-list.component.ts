import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksChangeType } from '../enum/tasks_change_type.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input()
  public title: string = 'Task list Section';

  @Input()
  public tasks: Array<Task>;
  
  @Output()
  public change: EventEmitter<{type: TasksChangeType, value: string }> = new EventEmitter<{type: TasksChangeType, value: string }>()
  constructor() { }

  ngOnInit(): void {
  }

  public onSubmitNewTask(description: string) {
    this.change.emit({type: TasksChangeType.ADD, value: description});
  }
  
  public onCompleteTask(taskId: string) {
    this.change.emit({type: TasksChangeType.COMPLETE, value: taskId});
  }

}
