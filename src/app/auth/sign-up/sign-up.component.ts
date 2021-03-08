import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '../../api/auth/auth.api';
import { SignUp } from '../../models/sign-up.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public signUp: SignUp = new SignUp();

  constructor(
    private readonly authApi: AuthApi,
    private readonly router: Router
  ) {}

  public async onSubmit() {
    try {
      await this.authApi.signUp(this.signUp);
      this.router.navigate(['/auth']);
    } catch (error) {
      console.log(error);
    }
  }
}
