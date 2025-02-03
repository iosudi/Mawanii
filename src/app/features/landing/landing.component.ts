import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

type LanguageKey = 'ar' | 'en';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, TranslateModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LandingComponent {
  currentLanguage: string = 'ar';
  shown: boolean = true;

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }
  showMap(): void {
    const animationDuration = 500; // Match this to the zoom-in/zoom-out animation duration
    this.shown = false;
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, animationDuration);
  }

  switchLanguage(language: LanguageKey) {
    this.languageService.setLanguage(language);
  }
}
