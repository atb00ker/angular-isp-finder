import { Component } from '@angular/core';
import { AppRoutes } from '../app-routing.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  // Path
  home_path = '/' + AppRoutes.home
  about_path = '/' + AppRoutes.about

  // Third-Party Cookies
  third_cookies_enabled: boolean = true;

  ngAfterViewInit() {
    var receiveMessage = evt => {
      if (evt.data === 'MM:3PCunsupported') { this.third_cookies_enabled = false; }
      else if (evt.data === 'MM:3PCsupported') { this.third_cookies_enabled = true; }
    };
    window.addEventListener("message", receiveMessage, false);
  }

  loginBegin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user, token);
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        var token = result.credential.accessToken;
      }
      var user = result.user;
      console.log(user, token);
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
}
