import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectApi } from '../api/project/project.api';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public $projects: Observable<Project[]>;

  constructor(private readonly projectService: ProjectApi) {}

  ngOnInit(): void {
    this.$projects = this.projectService
      .listProjects()
      .pipe(map((result) => result.projects));
  }
}
