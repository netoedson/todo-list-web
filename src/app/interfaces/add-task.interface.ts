import { Task } from "../models/task.model";

export interface AddTaskResponse {
    result: {
        tasks: Array<Task>,
        total: number
    }
    included: number;
}