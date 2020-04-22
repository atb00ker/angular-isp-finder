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

// TODO: Not working in prod: https://github.com/angular/angularfire/issues/2114
// const redirectUnauthorizedToHome = () => redirectUnauthorizedTo([AppRoutes.home]);
// ...canActivate(redirectUnauthorizedToHome())

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.about, component: AboutComponent },
  { path: AppRoutes.addprovider, component: AddProviderComponent },
  // For SEO
  { path: 'about.html', component: AboutComponent },
  { path: '**', component: HomeComponent },
];

export const RoutedComponents = [HomeComponent, AboutComponent, AddProviderComponent];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
