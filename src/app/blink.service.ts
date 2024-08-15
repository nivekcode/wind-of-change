import {inject, Injectable, NgZone} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class BlinkService {
  #zone = inject(NgZone);
  isFirstChange = true;

  blink(id: string) {
    this.#zone.runOutsideAngular(() => {
      if (!this.isFirstChange) {
        (document.querySelector(`#${id}`) as any).style.background = '#3361ff';
      }
      setTimeout(() => {
        (document.querySelector(`#${id}`) as any).style.background = 'white';
      }, 2000)
      setTimeout(() => {
        this.isFirstChange = false;
      })
    });

  }
}
