import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/models/sign-in.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthApi } from '../../api/auth/auth.api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public signIn: SignIn = new SignIn();

  constructor(
    private readonly authApi: AuthApi,
    private readonly router: Router,
  ) {}

  public async onSubmit() {
    try {
      await this.authApi.signIn(this.signIn);      
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
