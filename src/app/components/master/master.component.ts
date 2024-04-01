import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  constructor(private sharedService: SharedService, private router: Router,) {

  }

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser() {
    const user = localStorage.getItem('upmetricsCred')
    if (user) {
      this.sharedService.user = JSON.parse(user);
    } else {
      this.router.navigate(['login'])
    }
  }
}
