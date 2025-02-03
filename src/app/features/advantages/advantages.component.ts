import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-advantages',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './advantages.component.html',
  styleUrl: './advantages.component.scss',
})
export class AdvantagesComponent {
  advantages: any = [
    {
      icon: './assets/images/advantages/1.svg',
      id: '01',
      content: {
        ar: 'موقع جغرافي استراتيجي وحلقة وصل بين قارات العالم',
        en: 'A strategic geographical location and a link between the continents of the world',
      },
    },
    {
      icon: './assets/images/advantages/2.svg',
      id: '02',
      content: {
        ar: 'أكبر شبكة موانئ في الشرق الأوسط',
        en: 'The largest port network in the Middle East',
      },
    },
    {
      icon: './assets/images/advantages/3.svg',
      id: '03',
      content: {
        ar: 'موانئ متخصصة صناعية وتجارية',
        en: 'Specialized industrial and commercial ports',
      },
    },
    {
      icon: './assets/images/advantages/4.svg',
      id: '04',
      content: {
        ar: 'بنية تحتية متطورة',
        en: 'Advanced infrastructure',
      },
    },
    {
      icon: './assets/images/advantages/5.svg',
      id: '05',
      content: {
        ar: 'مستودعات ومناطق لوجستية متكاملة',
        en: 'Integrated warehouses and logistics zones',
      },
    },
    {
      icon: './assets/images/advantages/6.svg',
      id: '06',
      content: {
        ar: 'مناطق للإيداع وإعادة التصدير',
        en: 'Deposit and re-export zones',
      },
    },
    {
      icon: './assets/images/advantages/7.svg',
      id: '07',
      content: {
        ar: 'مجمعات متخصصة لإصلاح وصيانة السفن',
        en: 'Specialized complexes for ship repair and maintenance',
      },
    },
    {
      icon: './assets/images/advantages/8.svg',
      id: '08',
      content: {
        ar: 'طاقة استيعابية ضخمة',
        en: 'Massive capacity',
      },
    },
    {
      icon: './assets/images/advantages/9.svg',
      id: '09',
      content: {
        ar: 'سياسات واضحة وإجراءات سهلة',
        en: 'Clear policies and easy procedures',
      },
    },
    {
      icon: './assets/images/advantages/10.svg',
      id: '10',
      content: {
        ar: 'منطقة رائدة للتزود بالوقود',
        en: 'A leading fueling zone',
      },
    },
    {
      icon: './assets/images/advantages/11.svg',
      id: '11',
      content: {
        ar: 'تعرفة وأجور تنافسية',
        en: 'Competitive tariffs and fees',
      },
    },
    {
      icon: './assets/images/advantages/12.svg',
      id: '12',
      content: {
        ar: 'فرص استثمارية واعدة',
        en: 'Promising investment opportunities',
      },
    },
    {
      icon: './assets/images/advantages/13.svg',
      id: '13',
      content: {
        ar: 'تسهيلات حكومية للقطاع الخاص والمستثمرين',
        en: 'Government facilities for the private sector and investors',
      },
    },
    {
      icon: './assets/images/advantages/14.svg',
      id: '14',
      content: {
        ar: 'معدات مناولة متطورة',
        en: 'Advanced handling equipment',
      },
    },
    {
      icon: './assets/images/advantages/15.svg',
      id: '15',
      content: {
        ar: 'منظومة عالية المستوى للأمن والسلامة',
        en: 'A high-level security and safety system',
      },
    },
    {
      icon: './assets/images/advantages/16.svg',
      id: '16',
      content: {
        ar: 'وسائل نقل متعددة الوسائط',
        en: 'Multimodal transportation means',
      },
    },
    {
      icon: './assets/images/advantages/17.svg',
      id: '17',
      content: {
        ar: 'منظومة متكاملة من الفنارات والمساعدات الملاحية',
        en: 'An integrated system of lighthouses and navigational aids',
      },
    },
    {
      icon: './assets/images/advantages/18.svg',
      id: '18',
      content: {
        ar: 'محطات متنوعة ومتخصصة',
        en: 'Diverse and specialized stations',
      },
    },
  ];

  @ViewChildren('advantage') Advantages!: QueryList<ElementRef>;

  currentLanguage: string = 'ar';
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

    this.Advantages.forEach((advantage, index) => {
      const el = advantage.nativeElement;
      const icon = el.querySelector('img'); // Select the icon
      const id = el.querySelector('.inter'); // Select the ID number
      const text = el.querySelector('p'); // Select the paragraph text

      // Step 1: Fade & slide in the whole advantage box
      tl.from(
        el,
        {
          duration: 0.8,
          y: 50,
          autoAlpha: 0,
          ease: 'power2.out',
        },
        `+=0.1`
      ); // Slight delay between each animation

      // Step 2: Rotate the icon (45 degrees)
      tl.from(
        icon,
        {
          duration: 0.6,
          rotation: -45,
          autoAlpha: 0,
          ease: 'power2.out',
        },
        '-=0.5'
      ); // Overlap with the previous animation

      // Step 3: Move the ID number from left to right
      tl.from(
        id,
        {
          duration: 0.6,
          x: -30,
          autoAlpha: 0,
          ease: 'power2.out',
        },
        '-=0.4'
      ); // Overlap for smoother effect

      // Step 4: Move the paragraph text from right to left
      tl.from(
        text,
        {
          duration: 0.6,
          x: 30,
          autoAlpha: 0,
          ease: 'power2.out',
        },
        '-=0.4'
      ); // Overlap with ID movement
    });
  }
}
