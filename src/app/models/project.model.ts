import { Task } from './task.model';

export class Project {
  constructor(
    public title: string,
    public tasks: Task[] = [],
    public createAt: Date,
    public updateAt: Date,
    public _id?: string
  ) {}
}
