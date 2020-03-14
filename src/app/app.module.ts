import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
// Components
import { NavComponent } from './nav/nav.component';
import { RoutedComponents } from './app-routing.module';

@Component({
  selector: 'app-root',
  template: `
  <app-nav></app-nav>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'ISP Finder';
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RoutedComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
