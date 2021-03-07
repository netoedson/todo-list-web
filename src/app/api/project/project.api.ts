import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTaskResponse } from '../../interfaces/add-task.interface';
import { ProjectListing } from '../../interfaces/project-listing.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProjectApi {
  private baseUrl = `${environment.api}project`;
  constructor(private readonly httpClient: HttpClient) {}

  public createProject(title: string) {
    return this.httpClient.post(this.baseUrl, { title });
  }

  public listProjects(): Observable<ProjectListing> {
    return this.httpClient.get<ProjectListing>(this.baseUrl);
  }

  public updateProject(projectId: string, title: string) {
    return this.httpClient.put(`${this.baseUrl}/${projectId}`, { title });
  }

  public deleteProject(projectId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${projectId}`);
  }

  public createTask(projectId: string, description: string): Observable<AddTaskResponse> {
    return this.httpClient.post<AddTaskResponse>(`${this.baseUrl}/${projectId}/tasks`, description);
  }

  public updateTask(taskId: string, description: string) {
    return this.httpClient.put(`${this.baseUrl}/tasks/${taskId}`, { description });
  }

  public completeTask(taskId: string) {
    return this.httpClient.put(`${this.baseUrl}/tasks/${taskId}/complete`, {});
  }

  public removeTask(taskId: string) {
    return this.httpClient.delete(`${this.baseUrl}/tasks/${taskId}`);
  }
}
