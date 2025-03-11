import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit{

  isAuthenticated: boolean = false;
  userFulname: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: typeof OktaAuth
  ){

  }

  ngOnInit(): void {
      //Subscribe to authentication state changes
      this.oktaAuthService.authState$.subscribe(
        (result) => {
          this.isAuthenticated = result.isAuthenticated!;
          this.getUserDetails();
        }
      );

      // this.oktaAuthService.authState$.subscribe((result) => {
      //   this.isAuthenticated = result.isAuthenticated!;
    
      //   if (this.isAuthenticated) {
      //     this.getUserDetails(); // Fetch user details only when authenticated
      //   } else {
      //     this.oktaAuth.signInWithRedirect(); // Redirect to Okta login if not authenticated
      //   }
      // });
  }

  getUserDetails(){
    if(this.isAuthenticated){
      //Fetch the logged in user details (user's claims)
      //suer full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res: any) => {
          this.userFulname = res.name as string;
        }
      );
    }
  }

  logout(){
    //terminate the sission with Okta and removes current tokens
    this.oktaAuth.signOut();
  }

}
