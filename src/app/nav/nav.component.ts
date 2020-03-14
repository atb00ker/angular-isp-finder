import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../app-routing.module';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(public authenticate: AuthService) { }

  // Path
  home_path = '/' + AppRoutes.home;
  about_path = '/' + AppRoutes.about;
  addprovider_path = '/' + AppRoutes.addprovider;

  ngOnInit() {
    this.authenticate.getUserLoggedIn();
    this.authenticate.checkCookiesEnabled();
  }
}
