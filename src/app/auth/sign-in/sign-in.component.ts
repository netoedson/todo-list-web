import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/models/sign-in.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
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
    private readonly toastService: ToastService
  ) {}

  public async onSubmit() {
    try {
      const result = await this.authApi.signIn(this.signIn);
      this.toastService.show(`Welcome, ${result.user.name}`, {
        classname: 'bg-success text-light',
        delay: 10000,
      });
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
