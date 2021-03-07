import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ProjectCardComponent,
    TaskListComponent,
    TaskItemComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class HomeModule {}
