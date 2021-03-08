import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProjectApi } from '../api/project/project.api';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public projects: Array<Project>;

  public projectTitle: string;

  constructor(private readonly projectService: ProjectApi) {}

  public async ngOnInit(): Promise<void> {
    try {
      this.projects = (await this.projectService.listProjects()).projects;

    } catch (error) {
      console.log(error);
    }
  }

  public async addNewProject() {
    try {
      const project = await this.projectService.createProject(this.projectTitle)
      this.projects.push(project);
      this.projectTitle = "";
      
    } catch (error) {
      console.log(error);
    }
  }

  public async onRemove(id: string){
    try {
      this.projects.splice(this.projects.findIndex((project) => project._id === id), 1);
      await this.projectService.deleteProject(id);
      
    } catch (error) {
      console.error(error);
    }
  }

  public async onUpdate(event: {projectId: string, title: string}) {
    try {
      
      await this.projectService.updateProject(event.projectId, event.title);

    } catch (error) {
      console.error(error);
    } 
  }
}
