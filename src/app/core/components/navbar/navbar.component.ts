import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

type LanguageKey = 'ar' | 'en';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('menu') menu: ElementRef | undefined;
  activeLinkUrl: string = '';
  isActiveLinkFound: boolean = false;
  backgroundPosition = { left: 0, width: 0, height: 0 };
  currentLanguage: LanguageKey = 'ar';
  links = [
    {
      name: { ar: 'اللوحة الرئيسية', en: 'Home' },
      url: '/home',
    },
    {
      name: { ar: 'عن الشركة', en: 'About Us' },
      url: '/about',
    },
    {
      name: { ar: 'ماذا تستقبل المواني', en: 'What Ports Receive' },
      url: '/ports',
    },
    {
      name: { ar: 'مزايا موانئ المملكة', en: 'Advantages of Saudi Ports' },
      url: '/advantages',
    },
    {
      name: {
        ar: 'أبرز الطموحات والافاق المستقبلية',
        en: 'Major Ambitions and Future Prospects',
      },
      url: '/ambitions',
    },
    {
      name: {
        ar: 'استراتيجية الهيئة العامة للمواني',
        en: 'General Authority for Ports Strategy',
      },
      url: '/strategy',
    },
    {
      name: {
        ar: 'الاستراتيجية الوطنية للنقل والخدمات اللوجيستية',
        en: 'National Transport and Logistics Strategy',
      },
      url: '/national-strategy',
    },
    {
      name: {
        ar: 'محطات في مسيرة الموانئ السعودية',
        en: 'Milestones in the Journey of Saudi Ports',
      },
      url: '/history',
    },
  ];

  private routerSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  // Method to set the active link and update background position
  setActiveLink(url: string): void {
    this.activeLinkUrl = url;
    this.updateBackgroundPosition();
  }

  // Calculate the background position and size based on the active link
  updateBackgroundPosition(): void {
    const activeLinkElement =
      this.menu?.nativeElement.querySelector('li.active-link');
    if (activeLinkElement) {
      const rect = activeLinkElement.getBoundingClientRect(); // Get position and size of active link
      this.backgroundPosition = {
        left: rect.left - this.menu?.nativeElement.getBoundingClientRect().left, // Position relative to the menu
        width: rect.width,
        height: rect.height,
      };

      this.isActiveLinkFound = true;
    } else {
      this.isActiveLinkFound = false;
    }
  }

  // Update the background position on initialization and on active link change
  ngAfterViewInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Add slight delay for DOM update
        setTimeout(() => {
          const activeLink = this.links.find((link) =>
            this.router.isActive(link.url, true)
          );
          if (activeLink) {
            this.setActiveLink(activeLink.url);
            this.cdr.detectChanges();
          }
        }, 50);
      }
    });

    new ResizeObserver(() => this.updateBackgroundPosition()).observe(
      this.menu?.nativeElement
    );
  }

  // Unsubscribe from the router events to prevent memory leaks
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
