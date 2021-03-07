import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestSignUp } from "src/app/interfaces/request-sign-up.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthApi {
    private baseUrl = environment.api;
    constructor(private readonly http: HttpClient){}

    public signIn(email: string, password: string) {
        return this.http.post(`${this.baseUrl}auth/login`, {email, password});
    }

    public signUp(request: RequestSignUp) {
        return this.http.post(`${this.baseUrl}auth/login`, request);
    }
}