import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { IdetailsISP } from '../app.interface';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent {
  constructor(private api: ApiService, public authenticate: AuthService) { }

  public isplist_data: IdetailsISP[] = [];
  public contact_author: string = environment.contact_author;
  public display_search_status: string = "none";
  public disable_search_btn: boolean = false;

  // Page Form
  pincode = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
  ]);

  // Search
  postalSearchClick() {
    this.disable_search_btn = true;
    this.display_search_status = "progress";
    this.getAreaISPRequest(this.pincode.value);
  }

  getAreaISPRequest = (pincode) => {
    this.api.getAreaISP(pincode).subscribe(data => {
      this.isplist_data = data
      this.disable_search_btn = false;
      if (this.isplist_data.length > 0)
        this.display_search_status = "success";
      else
        this.display_search_status = "error";
    })
  }
}
