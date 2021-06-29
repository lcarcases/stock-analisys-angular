import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  email: String;
  password: String;
  isLogin: Boolean;
  registeredUser: Object;
  registered: Boolean;
  logged: Boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeInput(event:any) {
    if(event.target.name = "username") {
      this.username = event.target.value;
    }

    if(event.target.name = "email") {
      this.email = event.target.value;
    }

    if(event.target.name = "password") {
      this.username = event.target.value;
    }
  }

  onToggleLoginRegisterView() {
    this.isLogin = !this.isLogin;
  }

  onLoginWithGoogle() {
    window.location.assign('http://127.0.0.1:3000/api/v1/users/auth/google');
  }

  onLoginWithFacebook() {
    //window.location.assign('http://127.0.0.1:3000/api/v1/users/auth/facebook');
    window.location.assign('https://57407d327847.ngrok.io/api/v1/users/auth/facebook');
  }

  async submitHandler(event) {
    event.preventDefault();
    if(!this.isLogin) {
        const res = await axios({
                                method: 'post',
                                url: 'http://127.0.0.1:3000/api/v1/users/register/',
                                data: {
                                  username: this.username,
                                  password: this.password,
                                  email: this.email
                                }
                              });

      if(res.data.success) {
         console.log("Registered Succesfully");
         this.registered = true;
         this.registeredUser = res.data.user;
      } else {
         this.registered = false;
      }

    } else {
        const res = await axios({
          method: 'post',
          url: 'http://127.0.0.1:3000/api/v1/users/login/',
          data: {
            username: this.username,
            password: this.password
          }
        });

       if(res.data.success) {
          console.log("Logged Succesfully");
          this.logged = true,
          this.registeredUser = res.data.user;
       } else {
          this.logged = false;
       }
    }
  }

}
