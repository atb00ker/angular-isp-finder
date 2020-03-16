import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Validators } from '@angular/forms';
import { environment } from '../../environments/environment'
// Angular Memory Leak Fix
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss'],
  providers: [ApiService]
})
export class AddProviderComponent {
  constructor(private api: ApiService, public authenticate: AuthService) { }
  public contact_author: string = environment.contact_author;
  public display_add_status: string = 'normal';
  public disable_add_btn: boolean = false;
  // Angular Memory Leak Fix
  private ngUnsubscribe = new Subject();

  add_provider_form = new FormGroup({
    pincode: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6),
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
    this.display_add_status = 'progress';
    this.disable_add_btn = true;
    this.addProviderRequest(this.add_provider_form.value['name'],
      this.add_provider_form.value['contact'],
      this.add_provider_form.value['website'],
      this.add_provider_form.value['pincode'],
      this.authenticate.user_uid);
  }

  addProviderRequest = (name, contact, website, pincode, uid) => {
    this.api.addProvider(name, contact, website, pincode, uid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        () => {
          this.display_add_status = 'success';
          this.add_provider_form.reset();
        },
        () => { this.display_add_status = 'error'; })
      .add(() => { this.disable_add_btn = false; });
  }

  ngOnDestroy() {
    // Angular Memory Leak Fix
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
