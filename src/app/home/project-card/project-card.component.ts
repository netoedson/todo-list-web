import { Component, Input, OnInit } from '@angular/core';
import { ProjectApi } from '../../api/project/project.api';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { TasksChangeType } from '../enum/tasks_change_type.enum';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input()
  public project: Project;

  constructor(private readonly projectService: ProjectApi) {}

  ngOnInit(): void {}

  public addNewTask() {
    this.project.tasks.push(new Task(''));
  }

  public onChangeTask(event: { type: TasksChangeType; value: string }) {
    if (event.type === TasksChangeType.ADD) {
      this.onSubmitNewTask(event.value);
    }
  }

  private onSubmitNewTask(description: string ) {
    this.projectService
      .createTask(this.project._id, description)
      .subscribe((response) => {
        this.project.tasks = response.result.tasks;
      });
  }
}
