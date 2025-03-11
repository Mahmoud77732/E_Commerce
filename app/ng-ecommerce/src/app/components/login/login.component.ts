import { Component, Inject, OnInit } from '@angular/core';
import {OKTA_AUTH} from '@okta/okta-angular';
// import { OktaAuth } from '@okta/okta-auth-js';
import * as OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget'; //declared in src/okta-signin-widget.d.ts
import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  // Use OktaAuth as an instance, not as a type
  constructor(@Inject(OKTA_AUTH) private oktaAuth: typeof OktaAuth) {
    // Initializing the OktaSignIn widget with configuration options
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true, //proof key for code exchange
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({
      //render element with given id, this name should be same as div tag id in login.comonent.html
      el: '#okta-sign-in-widget'},
      (response: any) => {
        if(response.status === 'SUCCESS'){
          this.oktaAuth.tokenManager.setTokens(response.tokens);  // Store tokens
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}