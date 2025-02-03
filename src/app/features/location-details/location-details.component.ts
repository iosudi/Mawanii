import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Subscription } from 'rxjs';
import { portDetails } from '../../../assets/data/port-details';
import { globalFadeAnimation } from '../../animations';
import { LanguageService } from '../../core/services/language.service';
import { ShowImagesSwiperService } from '../../core/services/show-images-swiper.service';
gsap.registerPlugin(Draggable);

@Component({
  selector: 'app-location-details',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.scss',
  animations: [globalFadeAnimation],
})
export class LocationDetailsComponent {
  private visibilitySubscription!: Subscription;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private scaleFactor = 0.005; // Sensitivity of scale
  private maxScale = 1.3; // Max scale for the SVG
  private minScale = 1; // Normal scale for the SVG
  private currentScale = 1;

  locations: any[] = portDetails;
  selectedLocation: any;
  currentLanguage: string = 'ar';

  text: string =
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.';
  textArray: string[] = this.text.split('');
  showDetails: boolean = true;
  isVisible: boolean = false;
  direction: 'ltr' | 'rtl' = 'rtl';

  @ViewChild('mySvg', { static: false }) svgElement!: ElementRef;
  @ViewChild('showImagesButton', { static: false })
  showImagesButton!: ElementRef;

  constructor(
    private _ShowImagesSwiperService: ShowImagesSwiperService,
    private router: Router,
    protected route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngOnInit(): void {
    // Get the id from the route parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); // assuming the id parameter is named 'id'

      // Filter the locations array based on the id
      if (id) {
        this.selectedLocation = this.locations.find(
          (location) => location.id == id
        );
      }

      if (
        this.selectedLocation &&
        this.selectedLocation.id >= 1 &&
        this.selectedLocation.id <= 6
      ) {
        this.direction = 'rtl';
      } else {
        this.direction = 'ltr';
      }
    });

    this.visibilitySubscription =
      this._ShowImagesSwiperService.visibility$.subscribe((visible) => {
        this.isVisible = visible;
      });
  }

  ngAfterViewInit() {
    const svg = this.svgElement.nativeElement;
    const button = this.showImagesButton.nativeElement;

    // Set initial transform origin for proper scaling
    gsap.set(svg, { y: '-50%', transformOrigin: '50% 50%' });
    // Add pointer event listeners (for mouse and touch)
    svg.addEventListener('pointerdown', (event: PointerEvent) =>
      this.startDrag(event)
    );
    svg.addEventListener('pointermove', (event: PointerEvent) =>
      this.drag(event)
    );
    svg.addEventListener('pointerup', () => this.endDrag());
    svg.addEventListener('pointerleave', () => this.endDrag());

    // Add touch event listeners
    svg.addEventListener('touchstart', (event: TouchEvent) =>
      this.handleTouchStart(event)
    );
    svg.addEventListener('touchmove', (event: TouchEvent) =>
      this.handleTouchMove(event)
    );
    svg.addEventListener('touchend', () => this.endDrag());
    svg.addEventListener('touchcancel', () => this.endDrag());
  }

  handleTouchStart(event: TouchEvent) {
    event.preventDefault(); // Prevent default touch behavior
    const touch = event.touches[0]; // Get the first touch point
    this.startDrag({
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => event.preventDefault(),
    } as PointerEvent);
  }

  handleTouchMove(event: TouchEvent) {
    event.preventDefault(); // Prevent default touch behavior
    const touch = event.touches[0]; // Get the first touch point
    this.drag({
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => event.preventDefault(),
    } as PointerEvent);
  }

  startDrag(event: PointerEvent) {
    event.preventDefault(); // Prevent default behavior
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  drag(event: PointerEvent) {
    if (!this.isDragging) return;

    const svg = this.svgElement.nativeElement;
    const button = this.showImagesButton.nativeElement;

    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Calculate the new scale based on the distance
    let scale = this.minScale + distance * this.scaleFactor;

    // Limit the scale to maxScale
    scale = Math.min(scale, this.maxScale);

    this.currentScale = scale;

    // Scale the SVG
    gsap.to(svg, {
      scale: scale,
      duration: 0.1,
      ease: 'power1.out',
    });
  }

  endDrag() {
    const svg = this.svgElement.nativeElement;
    const button = this.showImagesButton.nativeElement;

    if (!this.isDragging) return;
    this.isDragging = false;

    // If the scale is maxed out, we apply the expanded class
    if (this.currentScale >= this.maxScale) {
      svg.classList.add('expanded');
      this.toggleImages();
      return;
    } else {
      // Reset the scale and position of the SVG and button
      gsap.to(svg, {
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to(button, {
        x: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }

  // Toggle visibility and the expanded class
  toggleImages() {
    this.isVisible = !this.isVisible;
    this._ShowImagesSwiperService.toggleVisibility();

    if (this.selectedLocation && this.selectedLocation.images) {
      this._ShowImagesSwiperService.updateImages(this.selectedLocation.images);
    }
    console.log(
      '🚀 ~ LocationDetailsComponent ~ toggleImages ~ this.selectedLocation.images:',
      this.selectedLocation.images
    );

    const svg = this.svgElement.nativeElement;
    const button = this.showImagesButton.nativeElement;

    if (svg.classList.contains('expanded')) {
      svg.classList.remove('expanded');
      gsap.to(svg, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to(button, {
        x: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
      document.body.style.overflow = '';
    }
  }

  showMap(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    if (this.visibilitySubscription) {
      this.visibilitySubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }

    const svg = this.svgElement?.nativeElement;
    if (svg) {
      svg.removeEventListener('pointerdown', this.startDrag);
      svg.removeEventListener('pointermove', this.drag);
      svg.removeEventListener('pointerup', this.endDrag);
      svg.removeEventListener('pointerleave', this.endDrag);
    }
  }
}
