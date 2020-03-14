import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss'],
  providers: [ApiService]
})
export class AddProviderComponent {
  constructor(private api: ApiService, public authenticate: AuthService) { }

  addProviderForm = new FormGroup({
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
    this.addProviderRequest(this.addProviderForm.value['name'],
      this.addProviderForm.value['contact'],
      this.addProviderForm.value['website'],
      this.addProviderForm.value['pincode'],
      this.authenticate.user_uid);
  }

  addProviderRequest = (name, contact, website, pincode, uid) => {
    this.api.addProvider(name, contact, website, pincode, uid).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log("error");
        console.log(error);
      },
    );
  }
}
