import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AddProviderComponent } from './add-provider/add-provider.component';

export class AppRoutes {
  public static home = 'home';
  public static about = 'about';
  public static addprovider = 'addprovider';
}

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo([AppRoutes.home]);
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.about, component: AboutComponent },
  { path: AppRoutes.addprovider, component: AddProviderComponent, ...canActivate(redirectUnauthorizedToHome()) },
  { path: '**', component: HomeComponent },
];

export const RoutedComponents = [HomeComponent, AboutComponent, AddProviderComponent];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
