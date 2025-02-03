import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'get-started',
    pathMatch: 'full',
  },
  {
    path: 'get-started',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { animation: 'home' },
  },
  {
    path: 'location-details/:id',
    loadComponent: () =>
      import('./features/location-details/location-details.component').then(
        (m) => m.LocationDetailsComponent
      ),
    data: { animation: 'locationDetails' },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
    data: { animation: 'about' },
  },
  {
    path: 'ports',
    loadComponent: () =>
      import('./features/ports/ports.component').then((m) => m.PortsComponent),
    data: { animation: 'ports' },
  },
  {
    path: 'advantages',
    loadComponent: () =>
      import('./features/advantages/advantages.component').then(
        (m) => m.AdvantagesComponent
      ),
    data: { animation: 'advantages' },
  },
  {
    path: 'ambitions',
    loadComponent: () =>
      import('./features/ambitions/ambitions.component').then(
        (m) => m.AmbitionsComponent
      ),
    data: { animation: 'ambitions' },
  },
  {
    path: 'strategy',
    loadComponent: () =>
      import('./features/strategy/strategy.component').then(
        (m) => m.StrategyComponent
      ),
    data: { animation: 'strategy' },
  },
  {
    path: 'vision&mission',
    loadComponent: () =>
      import('./features/vision-mission/vision-mission.component').then(
        (m) => m.VisionMissionComponent
      ),
    data: { animation: 'vision-mission' },
  },
  {
    path: 'goals&pillars',
    loadComponent: () =>
      import('./features/goals-pillars/goals-pillars.component').then(
        (m) => m.GoalsPillarsComponent
      ),
    data: { animation: 'goals-pillars' },
  },
  {
    path: 'morals',
    loadComponent: () =>
      import('./features/morals/morals.component').then(
        (m) => m.MoralsComponent
      ),
    data: { animation: 'morals' },
  },
  {
    path: 'national-strategy',
    loadComponent: () =>
      import(
        './features/strategie-logistics/strategie-logistics.component'
      ).then((m) => m.StrategieLogisticsComponent),
    data: { animation: 'national-strategy' },
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./features/history/history.component').then(
        (m) => m.HistoryComponent
      ),
    data: { animation: 'history' },
  },
];
