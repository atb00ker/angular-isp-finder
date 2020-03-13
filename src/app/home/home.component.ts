import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { IdetailsISP } from '../app.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent {
  pincode = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
  ]);
  contact_author = "ajay39in+isplist@gmail.com";
  isplist_data: IdetailsISP[] = [];

  constructor(private api: ApiService) { }

  postalSearchClick() {
    console.log(this.pincode.value)
    this.getAreaISP(this.pincode.value);
  }

  getAreaISP = (pincode) => {
    this.api.getAreaISP(pincode).subscribe(data => this.isplist_data = data)
  }
}
