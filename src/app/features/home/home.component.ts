import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import panzoom from '@panzoom/panzoom';
import { locations } from '../../../assets/constants/ports-locations';
import { globalFadeAnimation } from '../../animations';
import { LanguageService } from '../../core/services/language.service';

type LanguageKey = 'ar' | 'en';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [globalFadeAnimation],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  panzoomInstance: any;
  showMap: boolean = true;
  locations = locations;
  loading: boolean = true;
  currentLanguage: LanguageKey = 'ar';

  constructor(
    private router: Router,
    protected route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    setTimeout(() => {
      this.panzoomInstance = panzoom(this.mapContainer.nativeElement, {
        smoothScroll: true,
        maxScale: 1.5,
        minScale: 1,
        contain: 'outside',
        momentum: true,
      });
    }, 2200);
  }

  zoomIn(): void {
    if (this.panzoomInstance) {
      this.panzoomInstance.zoomIn();
    }
  }

  zoomOut(): void {
    if (this.panzoomInstance) {
      this.panzoomInstance.zoomOut();
    }
  }

  resetZoom(): void {
    if (this.panzoomInstance) {
      this.panzoomInstance.reset();
    }
  }

  showInfo(id: number): void {
    this.router.navigate(['/location-details', id]);
  }
}
