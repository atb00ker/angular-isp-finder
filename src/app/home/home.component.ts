import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { IdetailsISP } from '../app.interface';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
// Angular Memory Leak Fix
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent implements OnDestroy {
  constructor(private api: ApiService, public authenticate: AuthService) { }

  public isplist_data: IdetailsISP[] = [];
  public contact_author: string = environment.contact_author;
  public display_search_status: string = "none";
  public disable_search_btn: boolean = false;
  // Angular Memory Leak Fix
  private ngUnsubscribe = new Subject();

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
    this.api.getAreaISP(pincode)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.isplist_data = data
        this.disable_search_btn = false;
        if (this.isplist_data.length > 0)
          this.display_search_status = "success";
        else
          this.display_search_status = "error";
      })
  }

  ngOnDestroy() {
    // Angular Memory Leak Fix
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
