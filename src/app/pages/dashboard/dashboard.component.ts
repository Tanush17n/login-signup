import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  loggedUser: any;

  constructor() {
    const userLoggedIn = localStorage.getItem('loggedUser');
    if (userLoggedIn != null) {
      this.loggedUser = JSON.parse(userLoggedIn);
    }
  }
}
