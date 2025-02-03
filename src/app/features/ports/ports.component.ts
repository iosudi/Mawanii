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
  selector: 'app-ports',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './ports.component.html',
  styleUrl: './ports.component.scss',
})
export class PortsComponent implements AfterViewInit {
  strategies_content: any = [
    {
      id: '01',
      icon: './assets/images/ports_receive/1.svg',
      content: {
        ar: 'الحاويات.',
        en: 'Containers.',
      },
    },
    {
      id: '02',
      icon: './assets/images/ports_receive/2.svg',
      content: {
        ar: 'البضائع العامة.',
        en: 'General cargo.',
      },
    },
    {
      id: '03',
      icon: './assets/images/ports_receive/3.svg',
      content: {
        ar: 'البضائع السائبة الصلبة.',
        en: 'Solid bulk cargo.',
      },
    },
    {
      id: '04',
      icon: './assets/images/ports_receive/4.svg',
      content: {
        ar: 'البضائع السائبة السائلة.',
        en: 'Liquid bulk cargo.',
      },
    },
    {
      id: '05',
      icon: './assets/images/ports_receive/5.svg',
      content: {
        ar: 'سفن بضائع الدحرجة.',
        en: 'Ro-Ro ships.',
      },
    },
    {
      id: '06',
      icon: './assets/images/ports_receive/6.svg',
      content: {
        ar: 'الركاب.',
        en: 'Passengers.',
      },
    },
    {
      id: '07',
      icon: './assets/images/ports_receive/7.svg',
      content: {
        ar: 'المواشي الحية.',
        en: 'Live livestock.',
      },
    },
    {
      id: '08',
      icon: './assets/images/ports_receive/8.svg',
      content: {
        ar: 'زيت خام.',
        en: 'Crude oil.',
      },
    },
    {
      id: '09',
      icon: './assets/images/ports_receive/9.svg',
      content: {
        ar: 'غاز مسال.',
        en: 'Liquefied gas.',
      },
    },
  ];

  currentLanguage: string = 'ar';

  @ViewChild('title') title!: ElementRef;
  @ViewChild('p') p!: ElementRef;
  @ViewChildren('strategyInfo') strategyInfo!: QueryList<ElementRef>;

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    // Hide steps initially
    gsap.set(
      this.strategyInfo.toArray().map((step) => step.nativeElement),
      { autoAlpha: 0 }
    );

    this.animate();
  }

  private animate() {
    const tl = gsap.timeline();

    // Title animation
    tl.from(this.title.nativeElement, {
      duration: 1.2,
      autoAlpha: 0,
      scale: 0.6,
      ease: 'power2.out',
    });

    // MAIN PARAGRAPH ANIMATION - FIXED
    tl.from(this.p.nativeElement, {
      duration: 1,
      autoAlpha: 0,
      x: 200,
      ease: 'power2.out',
    });

    // Steps animation
    this.strategyInfo.forEach((step, index) => {
      const el = step.nativeElement;
      const icon = el.querySelector('.icon');
      const h2 = el.querySelector('h2');
      const p = el.querySelector('p');

      // Container animation
      tl.fromTo(
        el,
        { autoAlpha: 0 },
        {
          duration: 0.8,
          autoAlpha: 1,
          ease: 'power3.out',
        }
      );

      // Icon animation
      tl.fromTo(
        icon,
        {
          rotation: -45,
          transformOrigin: 'bottom right',
          autoAlpha: 0,
        },
        {
          duration: 0.8,
          rotation: 0,
          autoAlpha: 1,
          ease: 'back.out(1.7)',
        },
        '<' // Start with container animation
      );

      // Text content animation
      tl.fromTo(
        [h2, p],
        { x: 100, autoAlpha: 0 },
        {
          duration: 0.8,
          x: 0,
          autoAlpha: 1,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '<0.2' // Start 0.2s after container
      );
    });
  }
}
