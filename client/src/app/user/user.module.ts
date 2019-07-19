import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';

import { UserService } from './user.service';
import { SignupComponent } from './signup/signup.component';
import { UserVerifyComponent } from './user-verify/user-verify.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, UserVerifyComponent],
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  providers: [UserService]
})
export class UserModule { }
