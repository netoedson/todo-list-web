import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCheck,
  faEdit,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ProjectApi } from '../../api/project/project.api';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { TasksChangeType } from '../enum/tasks_change_type.enum';
import { UpdateTask } from '../types/task.types';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input()
  public project: Project;

  @Output()
  public remove: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public update: EventEmitter<{
    projectId: string;
    title: string;
  }> = new EventEmitter<{ projectId: string; title: string }>();

  public todoTasks: Array<Task> = [];
  public doneTasks: Array<Task> = [];

  public editIcon = faEdit;
  public removeIcon = faTrash;

  public confirmIcon = faCheck;
  public cancelIcon = faTimes;

  public isEditing = false;
  public hover = false;

  public newTitle: string;

  constructor(private readonly projectService: ProjectApi) {}

  ngOnInit(): void {
    this.filterCompleteTasks();
  }

  public addNewTask() {
    if (!this.todoTasks.some((task) => task.temp)) {
      this.todoTasks.push(new Task(''));
    }
  }

  public async onChangeTask(event: { type: TasksChangeType; value: string | Record<string, string> }) {
    switch (event.type) {
      case TasksChangeType.ADD:
        await this.onSubmitNewTask(event.value as string);   
        break;
      case TasksChangeType.COMPLETE:
        await this.onCompleteTask(event.value as string);   
        break;
      case TasksChangeType.UPDATE:
        await this.onUpdateTask(event.value as UpdateTask);   
        break;
      case TasksChangeType.REMOVE:
        await this.onRemoveTask(event.value as string);   
        break;
    
      default:
        throw Error('Task change type not found');
    }
  }

  public onActiveEdit(value: boolean) {
    this.isEditing = value;
    this.newTitle = this.project.title;
  }

  public onRemoveProject() {
    this.remove.emit(this.project._id);
  }

  public onConfirmEdit() {
    this.project.title = this.newTitle;
    this.update.emit({
      projectId: this.project._id,
      title: this.project.title,
    });
    this.onActiveEdit(false);
  }

  private async onSubmitNewTask(description: string) {
    try {
      const response = await this.projectService.createTask(
        this.project._id,
        description
      );
      this.project.tasks = response.result.tasks;
      this.filterCompleteTasks();
    } catch (error) {
      console.error(error);
    }
  }

  private async onUpdateTask(update: UpdateTask) {
    try {
      await this.projectService.updateTask(update.taskId, update.description);

    } catch (error) {
        console.log(error);
    }
  }

  private async onRemoveTask(taskId: string) {
    try {
      this.todoTasks.splice(this.todoTasks.findIndex(task => task._id === taskId));
      await this.projectService.removeTask(taskId);

    } catch (error) {
        console.log(error);
    }
  }

  private async onCompleteTask(taskId: string) {
    try {
      const taskIndex = this.project.tasks.findIndex(task => task._id === taskId);
      
      await this.projectService.completeTask(taskId);
      
      this.project.tasks[taskIndex].completed = true;

      this.filterCompleteTasks();

    } catch (error) {
        console.log(error);
    }
  }

  private filterCompleteTasks() {
    this.todoTasks = this.project.tasks.filter((task) => !task.completed);
    this.doneTasks = this.project.tasks.filter((task) => task.completed);
  }
}
