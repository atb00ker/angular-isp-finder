import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public fireauth: AngularFireAuth) { }

  // Third-Party Cookies
  third_cookies_enabled: boolean = true;
  checkCookiesEnabled() {
    var receiveMessage = evt => {
      if (evt.data === 'MM:3PCunsupported') this.third_cookies_enabled = false;
      else if (evt.data === 'MM:3PCsupported') this.third_cookies_enabled = true;
    };
    window.addEventListener("message", receiveMessage, false);
  }

  // Firebase Authentication
  user_uid: string = null;
  user_email: string = null;
  loginBegin(provider) {
    if (this.third_cookies_enabled == false)
      alert('Please enable third-party cookies to login!');
    else {
      let providerObject = this.getProviderObject(provider);
      this.fireauth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {
        this.user_uid = result.user.uid;
        this.user_email = result.user.email;
        localStorage.setItem('afb_isp_uid', JSON.stringify(this.user_uid));
        localStorage.setItem('afb_isp_email', JSON.stringify(this.user_email));
        location.reload();
      }).catch(error => {
        console.log(error.code);
      });
    }
  }

  getProviderObject(provider) {
    if (provider == "Google")
      return new auth.GoogleAuthProvider()
  }


  getUserLoggedIn() {
    if (localStorage.getItem('afb_isp_uid')) {
      this.user_uid = JSON.parse(localStorage.getItem('afb_isp_uid'));
      this.user_email = JSON.parse(localStorage.getItem('afb_isp_email'));
    }
  }

  logoutBegin() {
    localStorage.removeItem('afb_isp_uid');
    localStorage.removeItem('afb_isp_email');
    location.reload();
  }
}
