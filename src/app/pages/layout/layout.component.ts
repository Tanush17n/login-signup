import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  router = inject(Router);

  onLogOut() {
    if (confirm('are you sure you want to log out ??')) {
      localStorage.removeItem('loggedUser');
      this.router.navigateByUrl('login');
    }
  }
}
