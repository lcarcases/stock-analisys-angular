import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { GlobalDataService } from '../../services/globalDataService.services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //providers: [GlobalDataService]
})
export class LoginComponent implements OnInit {

  public username: String;
  public email: String;
  public password: String;
  isLogin: Boolean;
  registeredUser: Object;
  registered: Boolean;
  logged: Boolean;
  public user: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _globalDataService: GlobalDataService) {
    this.user = {
                  username: '',
                  password: '',
                  email: ''
                };
  }

  ngOnInit(): void {
    this.isLogin = true;
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
    window.location.assign(`http://${environment.domain}:3000/api/v1/users/auth/google`);
  }

  onLoginWithFacebook() {
    window.location.assign(`http://${environment.domain}:3000/api/v1/users/auth/facebook`);
    //window.location.assign('https://61d25eb12b61.ngrok.io/api/v1/users/auth/facebook');
  }

  async onSubmit() {
    console.log("submit login");
    //console.log(this.username);
    console.log(this.user.username);
    //$event.preventDefault();
    console.log(environment.domain);
    if(!this.isLogin) {
        const res = await axios({
                                method: 'post',
                                url: `http://${environment.domain}:3000/api/v1/users/register/`,
                                data: {
                                  username: this.user.username,
                                  password: this.user.password,
                                  email: this.user.email
                                }
                              });

      if(res.data.success) {
         console.log("Registered Succesfully");
         this.registered = true;
         this.registeredUser = res.data.user;
         this.router.navigate(['/'],{queryParams:{userRegistered:this.registeredUser}});
      } else {
         this.registered = false;
      }

    } else {
        const res = await axios({
          method: 'post',
          url: `http://${environment.domain}:3000/api/v1/users/login/`,
          data: {
            username: this.user.username,
            password: this.user.password
          }
        });

       if(res.data.success) {
          console.log("Logged Succesfully");
          this.logged = true,
          this.registeredUser = res.data.user;
          this._globalDataService.setRegisteredUser(this.registeredUser[0]);
          sessionStorage.setItem('USer',JSON.stringify(this.registeredUser[0]));
          this.router.navigate(['/stocks']);
          /*this.router.navigate(['/stocks'],{queryParams:{id:this.registeredUser[0]._id,
                                                   email: this.registeredUser[0].email,
                                                   password: this.registeredUser[0].password,
                                                   username: this.registeredUser[0].username
                                                  }
                                     }
                              );*/
       } else {
          this.logged = false;
          this.router.navigate(['/login']);
       }
    }
  }

}
