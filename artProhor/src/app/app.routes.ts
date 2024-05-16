import { Routes } from '@angular/router';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path:"" ,redirectTo:'login',pathMatch:'full'},
    {path:'login',component:SignInComponent},
    {path:'registration',component:SignUpComponent},
    {path:'dashboard',component:DashboardComponent}
];
