/*
mail: mahmoud.hegazy
*/


export default {

    // info from https://dev-36532846-admin.okta.com/
    oidc: {
        clientId: '0oakhtkqs0WbgAqe75d7', //public identifier
        issuer: 'https://dev-36532846.okta.com/oauth2/default', //authorization server on okta: issuer of tokens
        // redirectUri: window.location.origin + '/login/callback',
        redirectUri: 'http://localhost:4200/login/callback', //once user logs in, send them here
        scopes: ['openid', 'profile', 'email'], //openid: authentication requests, profile: users's info, email: user's email
        // pkce: true
    }

}

// http://localhost:4200/implicit/callback
// http://localhost:4200/login/callback