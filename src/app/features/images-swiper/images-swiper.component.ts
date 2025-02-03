import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { ShowImagesSwiperService } from '../../core/services/show-images-swiper.service';
register();
@Component({
  selector: 'app-images-swiper',
  imports: [CommonModule, TranslateModule],
  templateUrl: './images-swiper.component.html',
  styleUrl: './images-swiper.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImagesSwiperComponent {
  images: string[] = [];

  private visibilitySubscription!: Subscription;
  private routeSubscription!: Subscription;

  isVisible: boolean = false;

  constructor(
    private _ShowImagesSwiperService: ShowImagesSwiperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.visibilitySubscription =
      this._ShowImagesSwiperService.visibility$.subscribe((visible) => {
        this.isVisible = visible;
      });

    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isVisible = false;
        this._ShowImagesSwiperService.toggleVisibility();
      }
    });

    this._ShowImagesSwiperService.images$.subscribe((images) => {
      this.images = images;
      console.log(
        '🚀 ~ ImagesSwiperComponent ~ this._ShowImagesSwiperService.images$.subscribe ~ images:',
        images
      );
    });
  }

  toggleImages() {
    this.isVisible = false;
    this._ShowImagesSwiperService.toggleVisibility(); // Toggle the visibility state in the service
  }

  ngOnDestroy(): void {
    if (this.visibilitySubscription) {
      this.visibilitySubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
