import {
  animate,
  keyframes,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const imageAnimation = trigger('imageAnimation', [
  // Animation when navigating from history to home
  transition('history => home', [
    style({ left: '-50%' }),
    animate(
      '1s ease-in-out',
      keyframes([
        style({ left: '-50%', width: '300px', offset: 0 }),
        style({ left: '0', width: '1000px', offset: 0.5 }),
        style({ left: '100%', width: '300px', offset: 1 }),
      ])
    ),
  ]),
  // Animation when navigating from home to history
  transition('home => history', [
    style({ right: '-50%' }),
    animate(
      '1s ease-in-out',
      keyframes([
        style({ right: '-50%', width: '300px', offset: 0 }),
        style({ right: '0', width: '1000px', offset: 0.5 }),
        style({ right: '100%', width: '300px', offset: 1 }),
      ])
    ),
  ]),
]);

export const globalFadeAnimation = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(':leave', [animate('0.2s 0.3s', style({ opacity: 0 }))], {
      optional: true,
    }),
    query(':enter', [animate('0.2s', style({ opacity: 1 }))], {
      optional: true,
    }),
  ]),
]);

export const specialTransitionAnimation = trigger('fadeZoomInOut', [
  // Enter animation remains the same for all cases
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  // Special leave animation only for home -> location-details
  transition('home => locationDetails', [
    style({ opacity: 1, transform: 'scale(1) translate(0,0)' }),
    animate(
      '500ms',
      style({
        opacity: 0,
        transform: 'scale(1.8) translate(-250px,180px)',
      })
    ),
  ]),
  // Default leave animation for all other cases
  transition(':leave', [
    style({ opacity: 1 }),
    animate('500ms', style({ opacity: 0 })),
  ]),
]);
