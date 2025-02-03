import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentRoute: string = '';

  constructor(private router: Router) {
    // Track current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  navigateWithAnimation(route: string) {
    // Check if navigation is between home and history
    const isHomeHistoryTransition =
      (this.currentRoute.includes('/home') && route === 'history') ||
      (this.currentRoute.includes('/history') && route === 'home');

    if (isHomeHistoryTransition) {
      // Apply delay only for home-history transitions
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.router.navigate([route]);
          resolve();
        }, 1000); // Adjust delay time as needed
      });
    } else {
      // Immediate navigation for other routes
      return this.router.navigate([route]);
    }
  }
}
