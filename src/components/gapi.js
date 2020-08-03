/* global gapi */
import * as credentials from './credentials.json';
// let GoogleAuth;
// let gapi;

export const clientID = credentials.web.client_id;
export const clientSecret = credentials.web.client_secret;

export function loadApi() {
  // get the api file
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  script.setAttribute('async', 'true');
  script.setAttribute('defer', 'true');

  init();
  // load
  // script.onload = () => {
  //   gapi.load('client', () => {
  //     gapi.client.load('youtube', 'v3', () => {
  //       this.setState({ gapiReady: true });
  //     });
  //   });
  // };

  document.body.appendChild(script);
}

function init() {
  gapi.load('auth2', function() {
    /* Ready. Make a call to gapi.auth2.init or some other API */
  });
  // gapi.auth2.init({ client_id: clientID }).then(
  //   function fulfilled() {
  //     console.log('Init succeed!');
  //   },
  //   function rejected(err) {
  //     console.error('Error init', err);
  //   }
  // );
}

// gapi.load('auth2', initSigninV2);
// authentication and authorization

// function signin() {
//   return gapi.auth2
//     .getAuthInstance()
//     .signIn({
//       scope:
//         'https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly',
//     })
//     .then(
//       function() {
//         console.log('Sign-in successful');
//       },
//       function(err) {
//         console.error('Error signing in', err);
//       }
//     );
// }

// function loadClient() {

// }

// Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {

// }

// Main
console.log('mainpage/index.js is loaded');


// Console messages
(() =>{
  console.log(`client ID: ${clientID}  client Secret: ${clientSecret}`);
})();