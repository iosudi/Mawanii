import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { SwipeButtonComponent } from '../../core/components/swipe-button/swipe-button.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-goals-pillars',
  imports: [CommonModule, RouterLink, SwipeButtonComponent],
  templateUrl: './goals-pillars.component.html',
  styleUrl: './goals-pillars.component.scss',
})
export class GoalsPillarsComponent {
  strategies_content: any = [
    {
      title: {
        ar: 'الأهداف الاستراتيجية',
        en: 'Strategic Objectives',
      },
      icon: './assets/images/Strategy/3.svg',
      steps: [
        {
          icon: './assets/images/goals/1.svg',
          content: {
            ar: 'تحسين فعالية المنظمة والتركيز علي رضي الموظفين وجودة الخدمات الداخلية.',
            en: 'Improving organizational efficiency and focusing on employee satisfaction and the quality of internal services. ',
          },
        },
        {
          icon: './assets/images/goals/2.svg',
          content: {
            ar: 'تعزيز جودة الخدمات المقدمة للشركاء لتحسين رضا العملاء',
            en: 'Enhancing the quality of services provided to partners to improve customer satisfaction',
          },
        },
        {
          icon: './assets/images/goals/3.svg',
          content: {
            ar: 'التركيز على السلامة والاستدامة من خلال خفض معدل الوفيات الناجمة عن الحوادث وخفض انبعاثات الكربون.',
            en: 'Focusing on safety and sustainability by reducing the fatality rate from accidents and lowering carbon emissions.',
          },
        },
        {
          icon: './assets/images/goals/4.svg',
          content: {
            ar: 'زيادة كفاءة البيئة التنظيمية في القطاع البحري والموانئ ورقمنة المعاملات.',
            en: 'Increasing the efficiency of the regulatory environment in the maritime sector and ports, and digitizing transactions.',
          },
        },
      ],
    },
    {
      title: {
        ar: 'ركائز الاستراتيجية',
        en: 'Strategic Pillars',
      },
      icon: './assets/images/Strategy/2.svg',
      steps: [
        {
          icon: './assets/images/goals/5.svg',
          content: {
            ar: 'تمكين النمو والابتكار في النظام البحري في المملكة العربية السعودية. ',
            en: "Enabling growth and innovation in Saudi Arabia's maritime ecosystem",
          },
        },
        {
          icon: './assets/images/goals/6.svg',
          content: {
            ar: 'تعزيز الإطار التنظيمي والنموذج التشغيلي للهيئة.',
            en: 'Enhancing the regulatory framework and operational model of the authority.',
          },
        },
        {
          icon: './assets/images/goals/7.svg',
          content: {
            ar: 'ضمان بيئة تنظيمية وتجارية فعالة وموثوقة.',
            en: 'Ensuring an effective and reliable regulatory and commercial environment.',
          },
        },
      ],
    },
  ];

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
            gsap.from(content, {
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
