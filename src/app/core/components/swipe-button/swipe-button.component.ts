import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-swipe-button',
  imports: [CommonModule, TranslateModule],
  templateUrl: './swipe-button.component.html',
  styleUrl: './swipe-button.component.scss',
})
export class SwipeButtonComponent {
  @Input() navigateTo: string = '';

  @ViewChild('showImagesButton', { static: false })
  showDetails: boolean = true;
  isVisible: boolean = false;
  currentLanguage: string = 'ar';
  constructor(
    private router: Router,
    protected route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  // Toggle visibility and the expanded class
  navigate() {
    this.router.navigate([this.navigateTo]);
  }
}
