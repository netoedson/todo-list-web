export class Task {
  constructor(
    public description,
    public completed: boolean = false,
    public temp: boolean = true,
    public createAt?: Date,
    public updateAt?: Date,
    public _id?: string
  ) {}
}
