import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public contactAuthor: string = environment.app.contactAuthor;
  constructor(private titleService: Title) {
    this.titleService.setTitle("ISP Finder | About");
  }
}
