import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { globalFadeAnimation } from '../../animations';
import { AchievementDateComponent } from '../../core/components/achievement-date/achievement-date.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-history',
  imports: [
    AchievementDateComponent,
    CommonModule,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  animations: [globalFadeAnimation],
})
export class HistoryComponent {
  achievementDates = Array(14).fill(0);
  currentLanguage: string = 'ar';
  visibleIndexes: Set<number> = new Set();

  @ViewChild('drawPath', { static: false })
  drawPath!: ElementRef<SVGPathElement>;

  histories: any = [
    {
      date: 1939,
      title: {
        ar: 'افتتاح ميناء',
        en: 'Inauguration of ',
      },
      content: {
        ar: 'رأس تنورة',
        en: 'Ras Tanura Port',
      },
    },
    {
      date: 1949,
      title: {
        ar: 'افتتاح ميناء',
        en: 'Inauguration of ',
      },
      content: {
        ar: 'الملك عبدالعزيز',
        en: 'King Abdulaziz Port',
      },
    },
    {
      date: 1961,
      title: {
        ar: 'إعادة تشغيل ميناء',
        en: 'Reactivation of ',
      },
      content: {
        ar: 'ينبع التجاري',
        en: 'Yanbu Commercial Port',
      },
    },
    {
      date: 1972,
      title: {
        ar: 'تسمية ميناء جدة باسم',
        en: 'Renaming Jeddah Port as ',
      },
      content: {
        ar: 'ميناء جدة الإسلامي',
        en: 'Jeddah Islamic Port',
      },
    },
    {
      date: 1976,
      title: {
        ar: 'إنشاء المؤسسة',
        en: 'Establishment of ',
      },
      content: {
        ar: 'العامة للموانئ',
        en: 'the Saudi Ports Authority',
      },
    },
    {
      date: 1976,
      title: {
        ar: 'افتتاح ميناء',
        en: 'Inauguration of ',
      },
      content: {
        ar: 'جازان',
        en: 'Jazan Port',
      },
    },
    {
      date: 1977,
      title: {
        ar: 'افتتاح ميناء',
        en: 'Inauguration of ',
      },
      content: {
        ar: 'الجبيل التجاري',
        en: 'Jubail Commercial Port',
      },
    },
    {
      date: 1982,
      title: {
        ar: 'افتتاح ميناء',
        en: 'Inauguration of ',
      },
      content: {
        ar: 'الملك فهد الصناعي بالجبيل وينبع',
        en: 'King Fahad Industrial Port, Jubail',
      },
    },
    {
      date: 1994,
      title: {
        ar: 'افتتاح ميناء',
        en: 'Inauguration of ',
      },
      content: {
        ar: 'ضبا',
        en: 'Dhiba Port',
      },
    },
    {
      date: 1997,
      title: {
        ar: 'إسناد أعمال تشغيل',
        en: 'Privatization of ',
      },
      content: {
        ar: 'الموانئ للقطاع الخاص',
        en: 'port operations',
      },
    },
    {
      date: 2016,
      title: {
        ar: 'تدشين ميناء',
        en: 'Launch of ',
      },
      content: {
        ar: 'رأس الخير',
        en: 'Ras Al-Khair Port',
      },
    },
    {
      date: 2018,
      title: {
        ar: 'تحويل المؤسسة إلى',
        en: 'Transition to ',
      },
      content: {
        ar: 'الهيئة العامة للموانئ',
        en: 'the Saudi Ports Authority',
      },
    },
    {
      date: 2019,
      title: {
        ar: 'تدشين ميناء',
        en: 'Inauguration of',
      },
      content: {
        ar: 'الملك عبدالله',
        en: 'King Abdullah Port',
      },
    },
    {
      date: 2021,
      title: {
        ar: 'بدء استثمار وتشغيل',
        en: 'Investment and operation of ',
      },
      content: {
        ar: 'ميناء مدينة جازان للصناعات الأساسية والتحويلية',
        en: 'Jazan City for Primary & Downstream Industries Port',
      },
    },
  ];

  constructor(
    protected route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.showElementsWithDelay();
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    gsap.set(this.drawPath.nativeElement, { visibility: 'hidden' });
    gsap.set('#endImage', { visibility: 'hidden' });

    gsap.fromTo(
      '#startImage',
      { rotation: -35, scale: 0.6 },
      {
        rotation: 0,
        scale: 1,
        ease: 'bounce.out',
        duration: 1,
      }
    );
  }

  showElementsWithDelay() {
    this.achievementDates.forEach((_, i) => {
      setTimeout(() => {
        this.visibleIndexes.add(i);

        if (i === 7) {
          this.animateSvgPath();
        }

        if (i === this.achievementDates.length - 1) {
          setTimeout(() => {
            this.animateEndImage();
          }, 1800);
        }
      }, i * 1200);
    });
  }

  animateEndImage() {
    gsap.fromTo(
      '#endImage',
      { rotation: 45, scale: 0.6 },
      {
        rotation: 0,
        scale: 1,
        ease: 'bounce.out',
        duration: 0.5,
        onStart: () => {
          gsap.set('#endImage', { visibility: 'visible' });
        },
      }
    );
  }

  animateSvgPath() {
    const path = this.drawPath.nativeElement;

    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      onStart: () => {
        gsap.set(this.drawPath.nativeElement, { visibility: 'visible' });
      },
    });
  }

  isVisible(index: number): boolean {
    return this.visibleIndexes.has(index);
  }
}
