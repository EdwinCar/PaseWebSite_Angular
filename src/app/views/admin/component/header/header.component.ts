import { AuthService } from './../../../../services/users/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userCurrent: any;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userCurrent = this.userService.getUserToken();
  }

  ngLogOut() {
    this.authService.logout();
  }
}
