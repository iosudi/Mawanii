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

  portTypes: any[] = [
    {
      title: {
        ar: 'موانئ تدار من قبل الهيئة العامه للموانئ',
        en: 'Ports managed by the General Authority of Ports',
      },
      color: '#cddc29',
    },
    {
      title: {
        ar: 'موانئ تدار من قبل الهيئة الملكية للجبيل وينبع',
        en: 'Ports managed by the Royal Commission for Jubail and Yanbu',
      },
      color: '#DCDBD9',
    },
    {
      title: {
        ar: 'موانئ تدار من قبل شركة نيوم',
        en: 'Ports managed by NEOM',
      },
      color: '#29DC97',
    },
    {
      title: {
        ar: 'موانئ تدار من قبل القطاع الخاص',
        en: 'Privately managed ports',
      },
      color: '#3FA2B9',
    },
  ];

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
    if (id > 0) {
      this.router.navigate(['/location-details', id]);
    }
  }
}
