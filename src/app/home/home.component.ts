import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { IdetailsISP } from '../app.interface';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
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

  public isplistData: IdetailsISP[] = [];
  public displaySearchStatus = 'none';
  public disableSearchBtn = false;
  // Angular Memory Leak Fix
  private ngUnsubscribe = new Subject();

  // Page Form
  pincode = new FormControl(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(9999999999)
  ]);

  // Search
  postalSearchClick() {
    this.disableSearchBtn = true;
    this.displaySearchStatus = 'progress';
    this.getAreaISPRequest(this.pincode.value);
  }

  getAreaISPRequest = (pincode) => {
    this.api.getAreaISP(pincode)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.isplistData = data;
        this.disableSearchBtn = false;
        if (this.isplistData.length > 0) {
          this.displaySearchStatus = 'success';
        } else {
          this.displaySearchStatus = 'error';
        }
      });
  }

  ngOnDestroy() {
    // Angular Memory Leak Fix
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
