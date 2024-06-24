import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

const accountModule = () =>
  import('./pages/account/account.module').then(x => x.AccountModule);
const listModule = () =>
  import('./pages/list/list.module').then(x => x.ListModule);
const homeModule = () =>
  import('./pages/home/home.module').then(x => x.HomeModule);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'account', loadChildren: accountModule },
  { path: 'list', loadChildren: listModule,  canActivate: [AuthGuard] },
  { path: 'home', loadChildren: homeModule, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
