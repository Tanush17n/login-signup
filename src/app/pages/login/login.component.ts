import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoginView: boolean = true;

  router = inject(Router);

  userRegisterObj: any = {
    emailId: '',
    userName: '',
    password: '',
  };

  userLoginObj: any = {
    emailId: '',
    password: '',
  };

  onRegister() {
    debugger;
    const isLocalData = localStorage.getItem('existingUsers');
    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      const isUserFound = localArray.find(
        (item: any) => item.emailId == this.userRegisterObj.emailId
      );
      if (isUserFound != undefined) {
        alert('User already exists, Please Login');
        this.isLoginView = true;
      } else {
        localArray.push(this.userRegisterObj);
        localStorage.setItem('existingUsers', JSON.stringify(localArray));
        alert('WELCOME, YOU ARE NOW A REGISTERED MEMBER');
        this.userRegisterObj.emailId = '';
        this.userRegisterObj.userName = '';
        this.userRegisterObj.password = '';
      }
    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem('existingUsers', JSON.stringify(localArray));
      alert('WELCOME, YOU ARE NOW A REGISTERED MEMBER');
      this.userRegisterObj.emailId = '';
      this.userRegisterObj.userName = '';
      this.userRegisterObj.password = '';
    }
  }

  onLogin() {
    debugger;
    const isLocalData = localStorage.getItem('existingUsers');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find(
        (item: any) =>
          item.emailId == this.userLoginObj.emailId &&
          item.password == this.userLoginObj.password
      );

      if (isUserFound != undefined) {
        // this will show which user is logged in currently
        localStorage.setItem('loggedUser', JSON.stringify(isUserFound));
        this.router.navigateByUrl('dashboard');
        this.userLoginObj.emailId = '';
        this.userLoginObj.password = '';
      } else {
        const ifUserFound = users.find(
          (item: any) =>
            item.emailId == this.userLoginObj.emailId &&
            item.password != this.userLoginObj.password
        );
        if (ifUserFound != undefined) {
          alert('Incorrect Password');
          this.userLoginObj.password = '';
        } else {
          alert('Please Register before logging in');
          this.userLoginObj.emailId = '';
          this.userLoginObj.password = '';
          this.isLoginView = false;
        }
      }
    } else {
      alert('Please Register before logging in');
      this.userLoginObj.emailId = '';
      this.userLoginObj.password = '';
      this.isLoginView = false;
    }
  }
}
