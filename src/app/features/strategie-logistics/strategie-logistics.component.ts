import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-strategie-logistics',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './strategie-logistics.component.html',
  styleUrl: './strategie-logistics.component.scss',
})
export class StrategieLogisticsComponent implements AfterViewInit {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('p1') p1!: ElementRef;
  @ViewChild('p2') p2!: ElementRef;
  @ViewChildren('stepRef') stepRefs!: QueryList<ElementRef>;
  @ViewChildren('line') lines!: QueryList<ElementRef>;

  currentLanguage: string = 'ar';

  steps: any[] = [
    {
      id: '01',
      icon: './assets/images/Strategie Logistics/1.svg',
      content: {
        ar: 'ترسيخ مكانة المملكة كمركز لوجستي عالمي',
        en: 'Consolidating the Kingdom’s position as a global logistics center',
      },
    },
    {
      id: '02',
      icon: './assets/images/Strategie Logistics/2.svg',
      content: {
        ar: 'الارتقاء بجودة الحياة في المدن السعودية',
        en: 'Improving the quality of life in Saudi cities',
      },
    },
    {
      id: '03',
      icon: './assets/images/Strategie Logistics/3.svg',
      content: {
        ar: 'المساهمة في تحقيق توازن الميزانية العامة',
        en: 'Contributing to achieving balance in the general budget',
      },
    },
    {
      id: '04',
      icon: './assets/images/Strategie Logistics/4.svg',
      content: {
        ar: 'تحسين أداء الجهاز الحكومي',
        en: 'Improving the performance of the government apparatus',
      },
    },
  ];

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    // Hide steps initially
    gsap.set(
      this.stepRefs.toArray().map((step) => step.nativeElement),
      { autoAlpha: 0 }
    );

    this.animate();
  }

  private animate() {
    const tl = gsap.timeline();

    // Animate each line separately
    this.lines.forEach((line, index) => {
      const textSpan = line.nativeElement.querySelector('.text');
      const cursor = line.nativeElement.querySelector('.cursor');

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
      tl.from(
        textSpan,
        {
          duration: 1.2,
          width: 0,
          delay: 0.5,
          ease: 'power2.out',
        },
        `-=${index * 0.5}`
      ) // Overlapping animation

        // Fade out cursor after text is fully revealed
        .to(cursor, { opacity: 0, duration: 0.3 }, '-=0.5');
    });

    // Animate the paragraphs after title animation
    tl.from(this.p1.nativeElement, {
      duration: 1,
      y: 250,
      autoAlpha: 0,
      ease: 'power2.out',
    }).from(
      this.p2.nativeElement,
      {
        duration: 1,
        y: 250,
        autoAlpha: 0,
        ease: 'power2.out',
      },
      '-=0.7'
    ); // Overlapping animations

    // Animate steps
    tl.add(() => {
      this.stepRefs.forEach((step, index) => {
        const el = step.nativeElement;
        const icon = el.querySelector('.icon');
        const h2 = el.querySelector('h2');
        const p = el.querySelector('p');

        gsap.to(el, {
          duration: 0.8,
          y: 0,
          autoAlpha: 1,
          delay: index * 0.8,
          ease: 'power3.out',
        });

        gsap.from(icon, {
          duration: 0.8,
          rotation: -45,
          transformOrigin: 'bottom right',
          delay: index * 0.8,
          ease: 'back.out(1.7)',
        });

        gsap.from([h2, p], {
          duration: 0.8,
          x: 100,
          autoAlpha: 0,
          delay: index * 0.8 + 0.2,
          stagger: 0.1,
          ease: 'power2.out',
        });
      });
    });
  }
}
