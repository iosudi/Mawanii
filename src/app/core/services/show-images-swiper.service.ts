import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowImagesSwiperService {
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  private imagesSource = new BehaviorSubject<string[]>([]); // Store images
  images$ = this.imagesSource.asObservable();

  // Observable to allow other components to subscribe to visibility changes
  visibility$ = this.visibilitySubject.asObservable();

  constructor() {}

  // Toggle visibility
  toggleVisibility() {
    this.visibilitySubject.next(!this.visibilitySubject.value);
  }

  // Set visibility directly
  setVisibility(visible: boolean) {
    this.visibilitySubject.next(visible);
  }

  updateImages(images: string[]) {
    this.imagesSource.next(images);
  }
}
