import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitLogin(email, password) {
      this.authService.loginEmail(email, password)
          .then(a => {console.log(a);},
              err => {console.log(err);});
  }

}
