import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-achievement-date',
  imports: [CommonModule],
  templateUrl: './achievement-date.component.html',
  styleUrl: './achievement-date.component.scss',
})
export class AchievementDateComponent {
  @Input() showIcon: string | null = 'angle';
  @Input() history: any;
  @Input() currentLanguage: string = 'en';
  @ViewChild('icon') icon!: ElementRef;
  @ViewChild('i') i!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  @ViewChild('topBorder') topBorder!: ElementRef;
  @ViewChild('bottomBorder') bottomBorder!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('desc') desc!: ElementRef;

  ngAfterViewInit() {
    const timeline = gsap.timeline();

    // Animate icon (scaling on Y-axis)
    timeline.fromTo(
      this.icon.nativeElement,
      { scaleY: 0 },
      { scaleY: 1, duration: 1, ease: 'power2.out' }
    );

    // Animate h2 (fade from left to right, border animation)
    timeline.fromTo(
      this.date.nativeElement,
      { x: -100 },
      { x: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    timeline.fromTo(
      this.topBorder.nativeElement,
      { x: -100 },
      { x: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    timeline.to(
      '.date',
      {
        '--scale': 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.8'
    );

    timeline.fromTo(
      this.bottomBorder.nativeElement,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Animate the first <p> (rotating on its axis)
    timeline.fromTo(
      this.title.nativeElement,
      { rotationY: 270, transformOrigin: 'center' }, // Set the initial rotation and origin
      { rotationY: 360, duration: 1, ease: 'power2.out' }, // Rotate around Y-axis (depth)
      '-=0.8'
    );

    // Animate the second <p> (same animation as h2)
    timeline.fromTo(
      this.desc.nativeElement,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    if (this.i) {
      timeline.fromTo(
        this.i.nativeElement,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      );
    }
  }
}
