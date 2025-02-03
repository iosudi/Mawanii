import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { SwipeButtonComponent } from '../../core/components/swipe-button/swipe-button.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-morals',
  imports: [CommonModule, RouterLink, SwipeButtonComponent],
  templateUrl: './morals.component.html',
  styleUrl: './morals.component.scss',
})
export class MoralsComponent {
  strategies_content: any = {
    title: {
      ar: 'القيم',
      en: 'Values',
    },
    icon: './assets/images/Strategy/1.svg',
    steps: [
      {
        id: '01',
        icon: './assets/images/morals/1.svg',
        content: {
          ar: 'التنوع والشمول. ',
          en: 'Diversity and Inclusion',
        },
      },
      {
        id: '02',
        icon: './assets/images/morals/2.svg',
        content: {
          ar: 'التركيز على العملاء',
          en: 'Customer Focus',
        },
      },
      {
        id: '03',
        icon: './assets/images/morals/3.svg',
        content: {
          ar: 'الجودة والدقة',
          en: 'Quality and Precision  ',
        },
      },
      {
        id: '04',
        icon: './assets/images/morals/4.svg',
        content: {
          ar: 'التعاون والشفافية',
          en: 'Collaboration and Transparency',
        },
      },
      {
        id: '05',
        icon: './assets/images/morals/5.svg',
        content: {
          ar: 'الابتكار المستمر',
          en: 'Continuous Innovation',
        },
      },
    ],
  };

  currentLanguage: string = 'ar';

  @ViewChildren('strategyInfo') strategyInfo!: QueryList<ElementRef>;

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    // Hide steps initially

    this.animate();
  }

  private animate() {
    const tl = gsap.timeline();

    this.strategyInfo.forEach((strategy, index) => {
      const strategyElement = strategy.nativeElement;

      const header = strategyElement.querySelector('.header');
      const h2 = header.querySelector('h2');
      const img = header.querySelector('img');

      // Adding strategy animation to the timeline
      tl.add(
        gsap.from(strategyElement, {
          duration: 1,
          y: 50,
          autoAlpha: 0,
          ease: 'power2.out',
        }),
        '-=0.5' // Overlapping strategy info animations
      );

      tl.add(
        gsap.from(h2, {
          duration: 1,
          x: 250,
          autoAlpha: 0,
          ease: 'power2.out',
        })
      );

      tl.add(
        gsap.from(img, {
          duration: 1,
          scale: 0.6,
          rotate: 45,
          transformOrigin: 'bottom left',
          autoAlpha: 0,
          ease: 'back.out(1.7)',
        }),
        '-=0.3'
      );

      // Animate steps for each strategy
      strategyElement
        .querySelectorAll('.step')
        .forEach((stepEl: any, stepIndex: number) => {
          const icon = stepEl.querySelector('.icon');
          const content = stepEl.querySelector('p');
          const h2 = stepEl.querySelector('h2');
          tl.add(
            gsap.to(stepEl, {
              duration: 0.8,
              autoAlpha: 1,
              y: 0,
              ease: 'power3.out',
              delay: 0.1, // delay between each step animation
            }),
            '-=0.5' // Overlap previous step with next
          );

          tl.add(
            gsap.from(icon, {
              duration: 0.8,
              rotation: -45,
              transformOrigin: 'bottom right',
              autoAlpha: 0,
              ease: 'back.out(1.7)',
              delay: 0.1, // delay between icon animations
            }),
            '-=0.6' // Overlap with text content
          );

          tl.add(
            gsap.from([content, h2], {
              duration: 0.8,
              x: 100,
              autoAlpha: 0,
              stagger: 0.1,
              ease: 'power2.out',
              delay: 0.1, // delay between paragraph animations
            }),
            '-=0.6' // Overlap with icon animation
          );
        });
    });
  }
}
