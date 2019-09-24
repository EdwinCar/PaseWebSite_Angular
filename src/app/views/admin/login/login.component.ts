import { Component, OnInit } from '@angular/core';
import { AuthRequest } from 'src/app/services/shared/models/requests/AuthRequest';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/users/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authRequest: AuthRequest = new AuthRequest();
  message: string;
  state: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.authRequest.UserName = '';
    this.authRequest.Password = '';
  }

  ngOnInit() {
    var str = sessionStorage.getItem('currentUser');
    if (sessionStorage.getItem('currentUser')) {
      this.authService.logout();
    }
  }

  ngLogin() {
    console.log('Login: ', 'Inicio');
    console.log('Login:', this.authRequest.UserName);
    console.log('Login Password:', this.authRequest.Password);
    console.log('Login Masckara:', this.authRequest.MaskPassword);

    this.authService.login(this.authRequest).subscribe(
      result => {
        console.log('Login: ', 'Success');
        console.log('Login: ', result);
        if (result.state === 0) {
          const current = {
            user: this.authRequest.UserName,
            tokens: result.data
          };
          this.state = false;
          this.router.navigate(['/']);
          sessionStorage.setItem('currentUser', JSON.stringify(current));
        } else {
          this.ngCleanForm(result.message);
        }
      },
      error => {
        console.log('Login: ', 'Failed');
        this.authRequest.UserName = '';
        this.ngCleanForm('Usuario o contraseña incorrectos');
        console.log(error.message);
      },
      () => {
        setTimeout(() => {
          this.state = false;
        }, 4000);
      }
    );
  }

  ngMaskPassword($event) {
    const character = $event.value.split('').find(point => point !== '●');
    this.authRequest.MaskPassword = '●'.repeat($event.value.length);
    this.authRequest.Password = this.authRequest.Password.substring(0, $event.value.length);
    if ($event.value.length === 1) {
      this.authRequest.Password = '';
    }
    this.authRequest.Password = character ? this.authRequest.Password + character : this.authRequest.Password;
  }

  ngCleanForm(value: string) {
    this.authRequest.Password = '';
    this.authRequest.MaskPassword = '';
    this.message = value;
    this.state = true;
  }
}
