import { Task } from './task.model';

export class Project {
  constructor(
    public title: string,
    public tasks: Task[] = [],
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: string
  ) {}
}
