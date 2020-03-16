import { HostListener, Component, OnInit } from '@angular/core';
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
  public home_path: string = '/' + AppRoutes.home;
  public about_path: string = '/' + AppRoutes.about;
  public addprovider_path: string = '/' + AppRoutes.addprovider;
  public collapseEnabled: string = "NavBar"

  ngOnInit() {
    this.authenticate.getUserLoggedIn();
    this.authenticate.checkCookiesEnabled();
    this.enableBootstrapCollapse();
  }

  @HostListener('window:resize')
  enableBootstrapCollapse() {
    console.log(window.screen.width);
    if (window.screen.width > 768)
      this.collapseEnabled = "NavBar"
    else
      this.collapseEnabled = "collapsibleNavbar"
  }
}
