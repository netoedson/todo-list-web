import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAuthGuard } from './guards/home-auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomeAuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
