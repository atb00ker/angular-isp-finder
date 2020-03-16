import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public fireauth: AngularFireAuth) { }

  thirdCookiesEnabled = true;
  uidAuthUser: string = null;
  emailAuthUser: string = null;


  // Third-Party Cookies
  checkCookiesEnabled() {
    const receiveMessage = evt => {
      if (evt.data === 'MM:3PCunsupported') {
        this.thirdCookiesEnabled = false;
      } else if (evt.data === 'MM:3PCsupported') {
        this.thirdCookiesEnabled = true;
      }
    };
    window.addEventListener('message', receiveMessage, false);
  }

  // Firebase Authentication
  loginBegin(provider) {
    if (this.thirdCookiesEnabled === false) {
      alert('Please enable third-party cookies to login!');
    } else {
      const providerObject = this.getProviderObject(provider);
      this.fireauth.auth.signInWithPopup(providerObject).then(result => {
        this.uidAuthUser = result.user.uid;
        this.emailAuthUser = result.user.email;
        localStorage.setItem('afb_isp_uid', JSON.stringify(this.uidAuthUser));
        localStorage.setItem('afb_isp_email', JSON.stringify(this.emailAuthUser));
        location.reload();
      }).catch(error => {
        console.log(error.code);
      });
    }
  }

  getProviderObject(provider) {
    if (provider === 'Google') { return new auth.GoogleAuthProvider(); }
  }


  getUserLoggedIn() {
    if (localStorage.getItem('afb_isp_uid')) {
      this.uidAuthUser = JSON.parse(localStorage.getItem('afb_isp_uid'));
      this.emailAuthUser = JSON.parse(localStorage.getItem('afb_isp_email'));
    }
  }

  logoutBegin() {
    localStorage.removeItem('afb_isp_uid');
    localStorage.removeItem('afb_isp_email');
    location.reload();
  }
}
