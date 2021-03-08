import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddTaskResponse } from '../../interfaces/add-task.interface';
import { ProjectListing } from '../../interfaces/project-listing.interface';
import { environment } from '../../../environments/environment';
import { Project } from '../../models/project.model';

@Injectable()
export class ProjectApi {
  private baseUrl = `${environment.api}project`;
  constructor(private readonly httpClient: HttpClient) {}

  public createProject(title: string): Promise<Project> {
    return this.httpClient
      .post<Project>(this.baseUrl, { title })
      .toPromise();
  }

  public listProjects(): Promise<ProjectListing> {
    return this.httpClient.get<ProjectListing>(this.baseUrl).toPromise();
  }

  public updateProject(projectId: string, title: string) {
    return this.httpClient
      .put(`${this.baseUrl}/${projectId}`, { title })
      .toPromise();
  }

  public deleteProject(projectId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${projectId}`).toPromise();
  }

  public createTask(
    projectId: string,
    description: string
  ): Promise<AddTaskResponse> {
    return this.httpClient
      .post<AddTaskResponse>(`${this.baseUrl}/${projectId}/tasks`, {
        description,
      })
      .toPromise();
  }

  public updateTask(taskId: string, description: string) {
    return this.httpClient
      .put(`${this.baseUrl}/tasks/${taskId}`, { description })
      .toPromise();
  }

  public completeTask(taskId: string) {
    return this.httpClient
      .put(`${this.baseUrl}/tasks/${taskId}/complete`, {})
      .toPromise();
  }

  public removeTask(taskId: string) {
    return this.httpClient
      .delete(`${this.baseUrl}/tasks/${taskId}`)
      .toPromise();
  }
}
