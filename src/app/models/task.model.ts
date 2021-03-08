export class Task {
  constructor(
    public description,
    public completed: boolean = false,
    public temp: boolean = true,
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: string
  ) {}
}
