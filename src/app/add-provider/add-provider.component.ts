import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
// Angular Memory Leak Fix
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss'],
  providers: [ApiService]
})
export class AddProviderComponent implements OnDestroy {
  constructor(private api: ApiService, public authenticate: AuthService) { }
  public contactAuthor: string = environment.app.contactAuthor;
  public displayAddStatus = 'normal';
  public disableAddBtn = false;
  // Angular Memory Leak Fix
  private ngUnsubscribe = new Subject();

  addProviderForm = new FormGroup({
    pincode: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999999)
    ]),
    name: new FormControl(null, [
      Validators.required,
    ]),
    contact: new FormControl(null, []),
    website: new FormControl(null, [
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ]),
  });

  // Submit
  addProviderSubmit() {
    this.displayAddStatus = 'progress';
    this.disableAddBtn = true;
    this.addProviderRequest(this.addProviderForm.value.name,
      this.addProviderForm.value.contact,
      this.addProviderForm.value.website,
      this.addProviderForm.value.pincode,
      this.authenticate.uidAuthUser);
  }

  addProviderRequest = (name, contact, website, pincode, uid) => {
    this.api.addProvider(name, contact, website, pincode, uid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        () => {
          this.displayAddStatus = 'success';
          this.addProviderForm.reset();
        },
        () => { this.displayAddStatus = 'error'; })
      .add(() => { this.disableAddBtn = false; });
  }

  ngOnDestroy() {
    // Angular Memory Leak Fix
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
