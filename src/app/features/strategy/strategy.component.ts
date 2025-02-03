import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-strategy',
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.scss',
})
export class StrategyComponent {
  @ViewChild('title') title!: ElementRef;
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  currentLanguage: string = 'ar';

  isChildActive: boolean = false;

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isChildActive =
        currentRoute.includes('vision&mission') ||
        currentRoute.includes('goals&pillars');
    });

    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    // Hide steps initially
    gsap.set(
      this.cards.toArray().map((card) => card.nativeElement),
      { autoAlpha: 0, scale: 0.6 }
    );
    this.animate();
  }

  private animate() {
    const tl = gsap.timeline();

    const textSpan = this.title.nativeElement.querySelector('.text');
    const cursor = this.title.nativeElement.querySelector('.cursor');

    // Animate cursor moving from right to left
    if (this.currentLanguage === 'ar') {
      gsap.fromTo(
        cursor,
        { x: '100%', opacity: 1 }, // Start from the right
        { x: '0%', duration: 1.2, ease: 'power2.out' }
      );
    } else {
      gsap.fromTo(
        cursor,
        { x: '-100%', opacity: 1 }, // Start from the right
        { x: '0%', duration: 1.2, ease: 'power2.out' }
      );
    }

    // Animate text appearing from right to left
    tl.from(textSpan, {
      duration: 1.2,
      width: 0,
      delay: 0.5,
      ease: 'power2.out',
    }) // Overlapping animation

      // Fade out cursor after text is fully revealed
      .to(cursor, { opacity: 0, duration: 0.3 }, '-=0.5');

    tl.add(() => {
      this.cards.forEach((card, index) => {
        const el = card.nativeElement;
        const icon = el.querySelector('.icon');
        const p = el.querySelector('p');

        gsap.to(el, {
          duration: 1,
          scale: 1,
          y: 0,
          autoAlpha: 1,
          delay: index * 0.8,
          ease: 'back.out(1.7)',
        });

        gsap.from(icon, {
          duration: 0.8,
          rotation: -45,
          transformOrigin: 'bottom right',
          delay: index * 0.8,
          ease: 'back.out(1.7)',
        });

        gsap.from(p, {
          duration: 0.8,
          x: 100,
          autoAlpha: 0,
          delay: index * 0.8 + 0.2,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        });
      });
    });
  }
}
