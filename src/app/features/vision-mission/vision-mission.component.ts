import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { SwipeButtonComponent } from '../../core/components/swipe-button/swipe-button.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-vision-mission',
  imports: [CommonModule, RouterLink, SwipeButtonComponent],
  templateUrl: './vision-mission.component.html',
  styleUrl: './vision-mission.component.scss',
})
export class VisionMissionComponent {
  @ViewChildren('strategy') strategies!: QueryList<ElementRef>;
  @ViewChild('heroImage') heroImage!: ElementRef;
  currentLanguage: string = 'ar';
  strategies_content: any[] = [
    {
      icon: './assets/images/Strategy/5.svg',
      title: {
        ar: 'الرؤية',
        en: 'Vision',
      },
      description: {
        ar: 'تنمية قطاع بحري مستدام ومزدهر لترسيخ مكانة المملكة كمركز لوجستي عالمي وتمكين طموحاتها الاقتصادية والاجتماعية.',
        en: 'Developing a Sustainable and Thriving Maritime Sector To solidify the Kingdom’s position as a global logistics hub and empower its economic and social ambitions.',
      },
    },

    {
      icon: './assets/images/Strategy/4.svg',
      title: {
        ar: 'الرسالة',
        en: 'Mission',
      },
      description: {
        ar: 'المساهمة في جعل المملكة العربية السعودية رائدة في النظام البيئي للموان، مدعوم بعمليات موثوقة وفعالة وبيئة آمنة ومستدامة، مع خلق قيمة اقتصادية واجتماعية مع شركائها، وتعزيز الابتكار وتطوير القدرات الرائدة في الصناعة.',
        en: 'Contributing to Making Saudi Arabia a Leader in the Port Ecosystem Supported by reliable and efficient operations, a safe and sustainable environment, while creating economic and social value with its partners, fostering innovation, and developing leading capabilities in the industry.',
      },
    },
  ];

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    gsap.set(
      this.strategies.toArray().map((strategy) => strategy.nativeElement),
      { autoAlpha: 0 }
    );

    this.animate();
  }

  private animate() {
    const t1 = gsap.timeline();

    t1.from(this.heroImage.nativeElement, {
      duration: 1,
      y: 300,
      ease: 'power2.out',
    });

    t1.add(() => {
      this.strategies.forEach((strategy, index) => {
        const el = strategy.nativeElement;
        const icon = el.querySelector('img');
        const h2 = el.querySelector('h2');
        const p = el.querySelector('p');

        gsap.to(el, {
          duration: 0.8,
          y: 0,
          autoAlpha: 1,
          delay: index * 0.8,
          ease: 'power3.out',
        });

        gsap.from(h2, {
          duration: 0.8,
          x: 100,
          autoAlpha: 0,
          delay: index * 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        });

        gsap.from(p, {
          duration: 0.8,
          x: 100,
          autoAlpha: 0,
          delay: index * 0.8 + 0.2,
          stagger: 0.1,
          ease: 'power2.out',
        });

        gsap.from(icon, {
          duration: 0.8,
          rotation: -45,
          autoAlpha: 0,
          transformOrigin: 'bottom right',
          delay: index * 0.8 + 0.4,
          ease: 'back.out(1.7)',
        });
      });
    }, '-=0.7');
  }
}
