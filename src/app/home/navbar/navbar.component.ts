import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logout() {
    this.router.navigate(['/auth']);
  }

}
