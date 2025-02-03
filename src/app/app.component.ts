import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import {
  globalFadeAnimation,
  imageAnimation,
  specialTransitionAnimation,
} from './animations';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LanguageService } from './core/services/language.service';
import { ShowImagesSwiperService } from './core/services/show-images-swiper.service';
import { ImagesSwiperComponent } from './features/images-swiper/images-swiper.component';
type LanguageKey = 'ar' | 'en';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    ImagesSwiperComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [imageAnimation, globalFadeAnimation, specialTransitionAnimation],
})
export class AppComponent {
  title = 'Mawani';

  private visibilitySubscription!: Subscription;

  isVisible: boolean = false;

  images: string[] = [
    'https://i.pinimg.com/736x/d1/c0/4a/d1c04a86929cf68a020aad53f29cb45f.jpg',
    'https://i.pinimg.com/736x/fd/62/15/fd6215188052a1ad69daf0a19a842904.jpg',
    'https://i.pinimg.com/736x/73/95/9a/73959a94aec204087c075c3ec1932452.jpg',
    'https://i.pinimg.com/736x/92/53/0d/92530d2052da60b8243fd0fd6c1636ff.jpg',
    'https://i.pinimg.com/736x/c0/65/c6/c065c6ae77303abbe213ecf53c20d278.jpg',
  ];

  showImage: boolean = false;
  overlayState: 'hidden' | 'visible' = 'hidden';
  animationDirection: string = '';
  showFullscreenBtn: boolean = true;
  currentLanguage: string = 'ar';
  constructor(
    private _ShowImagesSwiperService: ShowImagesSwiperService,
    private router: Router,
    private translate: TranslateService,
    private cookieService: CookieService,
    private languageService: LanguageService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showImage = true;
      }
      if (event instanceof NavigationEnd) {
        // Hide the image after animation completes
        setTimeout(() => {
          this.showImage = false;
        }, 1500);
      }
    });
  }

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    window.addEventListener('resize', this.onWindowResize);

    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });

    this.visibilitySubscription =
      this._ShowImagesSwiperService.visibility$.subscribe((visible) => {
        this.isVisible = visible;
      });

    const savedLanguage = this.cookieService.get('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
    this.translate.use(this.currentLanguage);
  }

  switchLanguage(language: LanguageKey) {
    this.languageService.setLanguage(language);
    this.router.navigate(['/get-started']);
  }

  prepareRoute(outlet: RouterOutlet) {
    // This will return the animation state based on route data
    return outlet?.activatedRouteData?.['animation'];
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          this.showFullscreenBtn = false; // Hide button when fullscreen is active
        })
        .catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
      document.exitFullscreen().then(() => {
        this.showFullscreenBtn = true; // Show button when exiting fullscreen
      });
    }
  }

  private onFullscreenChange = () => {
    this.showFullscreenBtn = !document.fullscreenElement;
  };

  private onWindowResize = () => {
    const isFullScreen = window.innerHeight === screen.height;
    this.showFullscreenBtn = !isFullScreen;
  };

  ngOnDestroy(): void {
    if (this.visibilitySubscription) {
      this.visibilitySubscription.unsubscribe();
    }

    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }
}
