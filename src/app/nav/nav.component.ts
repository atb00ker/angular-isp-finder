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
  public HOME_PATH: string = '/' + AppRoutes.home;
  public ABOUT_PATH: string = '/' + AppRoutes.about;
  public ADD_PROVIDER_PATH: string = '/' + AppRoutes.addprovider;
  public collapseEnabled = 'NavBar';

  ngOnInit() {
    this.authenticate.getUserLoggedIn();
    this.authenticate.checkCookiesEnabled();
    this.enableBootstrapCollapse();
  }

  @HostListener('window:resize')
  enableBootstrapCollapse() {
    if (window.screen.width > 768) {
      this.collapseEnabled = 'NavBar';
    } else {
      this.collapseEnabled = 'collapsibleNavbar';
    }
  }
}
