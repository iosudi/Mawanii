import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

type LanguageKey = 'ar' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLanguage: LanguageKey = 'ar';
  private currentLanguageSubject = new BehaviorSubject<LanguageKey>(
    this.defaultLanguage
  );

  // Expose the current language as an observable
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(
    private cookieService: CookieService,
    private translate: TranslateService
  ) {
    // Initialize language from cookies or use default
    const savedLanguage = this.cookieService.get('language') as LanguageKey;
    if (savedLanguage === 'ar' || savedLanguage === 'en') {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getLanguage(): LanguageKey {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: LanguageKey): void {
    this.cookieService.set('language', language, 365); // Save language in cookies for 1 year
    this.currentLanguageSubject.next(language); // Emit the new language
    this.translate.use(language);
  }
}
