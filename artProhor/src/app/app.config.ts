import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import{provideFirebaseApp,initializeApp} from '@angular/fire/app';
import {getFirestore,provideFirestore} from '@angular/fire/firestore';
import {provideAuth,getAuth} from '@angular/fire/Auth';
import { routes } from './app.routes';


const firebaseConfig={
  apiKey: "AIzaSyAO_B1O8SQf6E_HnOL_dBzfK6oTwgQCI0w",
  authDomain: "artprohor-5054c.firebaseapp.com",
  projectId: "artprohor-5054c",
  storageBucket: "artprohor-5054c.appspot.com",
  messagingSenderId: "125823678248",
  appId: "1:125823678248:web:1819b96820631f83fc821d"
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom([provideFirebaseApp(()=>initializeApp(firebaseConfig)),provideFirestore(()=>getFirestore()),provideAuth(()=>getAuth())])],
  
};
