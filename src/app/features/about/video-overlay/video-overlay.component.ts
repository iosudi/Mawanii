import { Component, ViewChild } from '@angular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { AudioTrackList, VgCoreModule } from '@videogular/ngx-videogular/core';

import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

interface ExtendedMediaElement extends HTMLVideoElement {
  audioTracks?: AudioTrackList;
  msAudioCategory?: string;
  msAudioDeviceType?: string;
  msPlayToDisabled?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-video-overlay',
  standalone: true,
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  templateUrl: './video-overlay.component.html',
  styleUrl: './video-overlay.component.scss',
})
export class VideoOverlayComponent {
  @ViewChild('media') media!: any;
}
