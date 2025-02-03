import { CommonModule } from '@angular/common';
import {
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
  selector: 'app-ambitions',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './ambitions.component.html',
  styleUrl: './ambitions.component.scss',
})
export class AmbitionsComponent {
  currentLanguage: string = 'ar';

  future_plans: any = [
    {
      icon: './assets/images/ambitions/1.svg',
      content: {
        ar: '<span class="fw-bold"> إنشاء/تطوير </span> محطات الركاب في الموانئ لاستقبال ركاب الرحلات البحريه الدوليه والكروز',
        en: '<span class="fw-bold"> Developing  </span> passenger terminals for international maritime transport and cruises',
      },
    },
    {
      icon: './assets/images/ambitions/2.svg',
      content: {
        ar: '<span class="fw-bold"> تطوير </span> البنيه  التحتيه والفوقيه لمحطات البضائع',
        en: '<span class="fw-bold"> Enhancing   </span> port infrastructure for cargo handling',
      },
    },
    {
      icon: './assets/images/ambitions/3.svg',
      content: {
        ar: '<span class="fw-bold"> تضمين </span> التقنيات الذكيه والأتمتة عبر الموانئ والبنية التحتية اللوجستية',
        en: '<span class="fw-bold"> Implementing </span> smart automation and logistics infrastructure',
      },
    },
    {
      icon: './assets/images/ambitions/4.svg',
      content: {
        ar: '<span class="fw-bold"> تقليل </span> الأثر البيئي للنقل البحري على البيئة البحرية',
        en: '<span class="fw-bold"> Optimizing </span> operational efficiency for precise cargo delivery schedules',
      },
    },
    {
      icon: './assets/images/ambitions/5.svg',
      content: {
        ar: '<span class="fw-bold"> تعزيز </span> عدد خطوط اللملاحة وافتتاح خطوط جديدة, مع ربطها بموانئ إقليمية ودولية لتسهيل التجارة.',
        en: '<span class="fw-bold"> Facilitating </span> border clearance procedures for exports and re-exports',
      },
    },
    {
      icon: './assets/images/ambitions/6.svg',
      content: {
        ar: '<span class="fw-bold"> زيادة </span> الطاقة الاستيعابية في الموانئ لتصل إلي أكثر من 40 مليون حاوية قياسية',
        en: '<span class="fw-bold"> Increasing </span> handling capacity to over 40 million containers',
      },
    },
    {
      icon: './assets/images/ambitions/7.svg',
      content: {
        ar: '<span class="fw-bold"> تحقيق </span> التميز التشغيلي بتحسين دقة توقيت شحن واستلام البضائع',
        en: '<span class="fw-bold"> Achieve </span> operational excellence by improving the accuracy and timeliness of shipment and receipt of goods.',
      },
    },
    {
      icon: './assets/images/ambitions/8.svg',
      content: {
        ar: '<span class="fw-bold"> تسهيل </span> إجرءات الفسح وحركة البضائع عبر الحدود وحركة التصدير وإعادة التصدير.',
        en: '<span class="fw-bold"> Facilitating  </span> border clearance procedures for exports and re-exports',
      },
    },
    {
      icon: './assets/images/ambitions/9.svg',
      content: {
        ar: '<span class="fw-bold"> إنشاء </span> مناطق لوجستية متكاملة داخل الموانئ وخارجها وربطها بالموانئ؛ تصل بالمملكة ألى مراتب متقدمة في مؤشر الأداء اللوجستي.',
        en: '<span class="fw-bold"> Improving  </span> Saudi Arabia’s ranking in global logistics and maritime transport indices',
      },
    },
  ];

  goals: any = {
    firstRow: [
      {
        value: '40',
        span: {
          ar: 'مليون حاوية',
          en: 'million containers',
        },
        icon: './assets/images/ambitions/10.svg',
        content: {
          ar: 'زيادة الطاقة الاستيعابيه في الموانئ لتصل إلى أكثر من 40 مليون حاوية قياسية',
          en: 'Increase the port capacity to exceed 40 million standard containers.',
        },
      },
      {
        value: '%45',
        span: '',
        icon: './assets/images/ambitions/11.svg',
        content: {
          ar: 'رفع الحصة السوقية للمملكة من المسافنة الإقليمية إلى 45%.',
          en: 'Increase the Kingdom’s market share of regional transshipment to 45%.',
        },
      },
      {
        value: '70%',
        span: '',
        icon: './assets/images/ambitions/12.svg',
        content: {
          ar: 'رفع نسبة إشغال الموانئ إلى 70 % من طاقتها الاستيعابية الإجمالية',
          en: 'Increase port utilization to 70% of its total capacity.',
        },
      },
    ],

    secondRow: [
      {
        value: '80',
        span: '',
        icon: './assets/images/ambitions/13.svg',
        content: {
          ar: 'تحسين تصنيف المملكة على مؤشر الأونكتاد لخطوط النقل البحري، ورفعه إلى المرتبة 80 على مستوى دول المؤشر.',
          en: 'Improve the Kingdom’s ranking on UNCTAD’s maritime transport index, raising it to 80th place globally.',
        },
      },
      {
        value: '4',
        span: '',
        icon: './assets/images/ambitions/14.svg',
        content: {
          ar: 'رفع تصنيف المملكة على مؤشر الأداء اللوجستي إلى',
          en: 'Raise the Kingdom’s ranking on the logistics performance index to 4th place.',
        },
      },
      {
        value: '10',
        span: '',
        icon: './assets/images/ambitions/12.svg',
        content: {
          ar: 'تقدم ترتيب المملكة في مؤشر أداء الخدمات اللوجستية إلى المرتبة 10 عالمياًً وضمان ريادتها إقليمياًً.',
          en: 'Advance the Kingdom’s ranking on the global logistics performance index to 10th place, ensuring regional leadership.',
        },
      },
    ],

    thirdRow: [
      {
        value: '30',
        span: '',
        icon: './assets/images/ambitions/16.svg',
        content: {
          ar: 'رفع عدد مراكز الخدمات اللوجست ية لإعادة التصدير إلى 30 مركز.',
          en: 'Increase the number of logistics service centers for re-export to 30 centers.',
        },
      },
    ],
  };

  @ViewChildren('goal') Goals!: QueryList<ElementRef>;
  @ViewChildren('row') rows!: QueryList<ElementRef>;
  @ViewChild('container') container!: ElementRef;

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }

  ngAfterViewInit() {
    this.animate();
  }

  private animate() {
    const tl = gsap.timeline();

    // Right side header image scaling
    const headerImage = document.querySelector('.right-side .header img');
    tl.from(headerImage, {
      scaleY: 0,
      autoAlpha: 0,
      duration: 0.6,
      transformOrigin: 'center',
      ease: 'power2.out',
    });

    // Right side rows and goals animation (similar to existing implementation)
    const rightSideRows = document.querySelectorAll('.right-side .row');

    rightSideRows.forEach((row, rowIndex) => {
      tl.from(
        row,
        {
          duration: 0.3,
          y: 50,
          autoAlpha: 0,
          ease: 'power2.out',
        },
        `+=0.1`
      );

      // Select goals within this specific row
      const rowGoals = row.querySelectorAll('.goal');

      rowGoals.forEach((goal) => {
        tl.from(
          goal,
          {
            duration: 0.5,
            scale: 0.7,
            autoAlpha: 0,
            ease: 'power2.out',
          },
          `+=0.1`
        );
      });
    });

    // Left side animations
    const leftSide = this.container.nativeElement.querySelector('.left-side');
    const heading = leftSide.querySelector('.heading');
    const titleImages = leftSide.querySelectorAll('.title .image img');
    const titleParagraph = leftSide.querySelector('.title p');
    const leftSideRows = leftSide.querySelectorAll('.row .col-lg-4');

    // Heading width reveal
    tl.from(heading, {
      width: 0,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Title images rotation
    titleImages.forEach((img: any, index: any) => {
      tl.from(
        img,
        {
          rotation: -90,
          scale: 0.5,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        `+=0.2`
      );
    });

    // Title paragraph transition
    tl.from(titleParagraph, {
      autoAlpha: 0,
      y: 50,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Left side rows animation
    leftSideRows.forEach((row: any) => {
      tl.from(
        row,
        {
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        `+=0.1`
      );
    });
  }
}
