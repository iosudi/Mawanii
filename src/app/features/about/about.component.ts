import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';
import { LanguageService } from '../../core/services/language.service';
import { VideoOverlayComponent } from './video-overlay/video-overlay.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
  currentLanguage: string = 'ar';
  facts: any = [
    {
      value: '13',
      icon: '../../../assets/images/about/1.svg',
      content: {
        ar: 'ميناء علي البحر الأحمر و الخليج العربي',
        en: 'ports on the Red Sea and the Arabian Gulf',
      },
    },
    {
      value: '291',
      icon: '../../../assets/images/about/2.svg',
      content: {
        ar: 'رصيف',
        en: 'berths',
      },
    },
    {
      value: '70%',
      icon: '../../../assets/images/about/3.svg',
      content: {
        ar: 'من واردات المملكة تمر علي المؤاني',
        en: 'of the Kingdom’s imports pass through ports',
      },
    },
    {
      value: '95%',
      icon: '../../../assets/images/about/4.svg',
      content: {
        ar: 'من صادارات المملكة تمر علي المؤاني',
        en: 'of the Kingdom’s exports pass through ports',
      },
    },
    {
      value: '+1.1',
      icon: '../../../assets/images/about/5.svg',
      content: {
        ar: 'مليار طن وزني (طاقة استيعابية)',
        en: 'billion metric tons (handling capacity)',
      },
    },
    {
      value: '20',
      icon: '../../../assets/images/about/6.svg',
      content: {
        ar: 'مليون حاوية (طاقة استيعابية)',
        en: 'million containers (handling capacity)',
      },
    },
  ];

  @ViewChild('title') title!: ElementRef;
  @ViewChild('p1') p1!: ElementRef;
  @ViewChild('p2') p2!: ElementRef;

  @ViewChildren('stepRef') stepRefs!: QueryList<ElementRef>;
  private modalService = inject(NgbModal);

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit(): void {
    gsap.set(
      this.stepRefs.toArray().map((step) => step.nativeElement),
      { autoAlpha: 0 }
    );
    this.animate();
  }

  private animate() {
    const tl = gsap.timeline();

    // Animate text appearing from right to left
    tl.from(this.title.nativeElement, {
      duration: 1.2,
      opacity: 0,
      y: -50,
      ease: 'back.out(1.7)',
    }); // Overlapping animation

    // Animate the paragraphs after title animation
    tl.from(this.p1.nativeElement, {
      duration: 1,
      x: 250,
      autoAlpha: 0,
      ease: 'power2.out',
    }).from(
      this.p2.nativeElement,
      {
        duration: 1,
        x: 250,
        autoAlpha: 0,
        ease: 'power2.out',
      },
      '-=0.7'
    ); // Overlapping animations

    // Animate steps
    tl.add(() => {
      this.stepRefs.forEach((step, index) => {
        const el = step.nativeElement;
        const icon = el.querySelector('.icon-container');
        const p1 = el.querySelector('.inter');
        const p2 = el.querySelector('.content');

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

        gsap.from([p1, p2], {
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

  open() {
    const modalRef = this.modalService.open(VideoOverlayComponent, {
      size: 'xl',
      centered: true,
    });
  }

  getSafeHtml(key: string) {
    return this.sanitizer.bypassSecurityTrustHtml(this.translate.instant(key));
  }
}
