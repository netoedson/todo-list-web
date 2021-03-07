import { User } from "../models/user.model";

export interface SingInResponse {
    user: User;
    token: string;
}