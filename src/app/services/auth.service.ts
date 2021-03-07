import { Injectable } from "@angular/core";
import { SingInResponse } from "../interfaces/sign-in-response.interface";
import { User } from "../models/user.model";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {
    constructor(private readonly localStorageService: LocalStorageService) {}
    public user: User;
    public token: string;

    public startSession(value: SingInResponse): void {
        this.localStorageService.store('user', value.user);
        this.localStorageService.store('token', value.token);

        this.user = value.user;
        this.token = value.token;
    }

    public getUser(): User {
        if (this.user) return this.user;

        this.user = this.localStorageService.get('user');

        return this.user;
    }
}