import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'taskApp';

  constructor(private sharedService: SharedService) { }
  ngOnInit(): void {
    const user = localStorage.getItem('upmetricsCred');
    if (user) {
      this.sharedService.user = JSON.parse(user);
    }
  }

}
