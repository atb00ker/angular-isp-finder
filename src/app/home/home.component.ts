import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { IdetailsISP } from '../app.interface';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent {
  constructor(private api: ApiService, public authenticate: AuthService) { }
  isplist_data: IdetailsISP[] = [];
  contact_author = "ajay39in+isplist@gmail.com";

  // Page Form
  pincode = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
  ]);

  // Search
  postalSearchClick() {
    this.getAreaISPRequest(this.pincode.value);
  }

  getAreaISPRequest = (pincode) => {
    this.api.getAreaISP(pincode).subscribe(data => this.isplist_data = data)
  }
}
