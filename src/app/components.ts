import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {BlinkService} from "./blink.service";
import {SignalService} from "./signal.service";

@Component({
  standalone: true,
  selector: 'left-child',
  template: `
    <div class="element" id="left-child-container">
      <h1>Left parent</h1>
      <button (click)="handleIt()">Click</button>
      {{ changeBg() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftChildComponent {
  #blinkService = inject(BlinkService);

  handleIt() {
    console.log('blub');
  }

  changeBg() {
    this.#blinkService.blink('left-child-container');
  }
}


@Component({
  standalone: true,
  selector: 'left-parent',
  template: `
    <div class="element" id="left-parent-container">
      <h1>Left parent</h1>
      <left-child/>
      <button (click)="handleIt()">Click</button>
      {{ changeBg() }}
    </div>
  `,
  imports: [
    LeftChildComponent
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LeftParentComponent {
  #blinkService = inject(BlinkService);

  handleIt() {
    console.log('blub');
  }

  changeBg() {
    this.#blinkService.blink('left-parent-container');
  }
}

@Component({
  standalone: true,
  selector: 'right-child-one-grand-child',
  template: `
    <div class="element" id="right-child-one-grand-child">
      <h1>Right child one</h1>
      <button (click)="handleIt()">Click</button>
      {{ changeBg() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RightChildOneGrandChildComponent {
  #blinkService = inject(BlinkService);

  handleIt() {
    console.log('blub');
  }

  changeBg() {
    this.#blinkService.blink('right-child-one-grand-child');
  }
}

@Component({
  standalone: true,
  selector: 'right-child-one',
  template: `
    <div class="element" id="right-child-one-container">
      <h1>Right child one {{ signalService.someSignal() }}</h1>
      <right-child-one-grand-child/>
      <button (click)="handleIt()">Click</button>
      {{ changeBg() }}
    </div>
  `,
  imports: [
    RightChildOneGrandChildComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightChildOneComponent {
  #blinkService = inject(BlinkService);
  signalService = inject(SignalService);

  handleIt() {
    this.signalService.someSignal.update(v => v + 1);
    console.log('blub');
  }

  changeBg() {
    this.#blinkService.blink('right-child-one-container');
  }
}

@Component({
  standalone: true,
  selector: 'right-child-two',
  template: `
    <div class="element" id="right-child-two-container">
      <h1>Right child two</h1>
      <button (click)="handleIt()">Click</button>
      {{ changeBg() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RightChildTwoComponent {
  #blinkService = inject(BlinkService);

  handleIt() {
    console.log('blub');
  }

  changeBg() {
    this.#blinkService.blink('right-child-two-container');
  }
}

@Component({
  standalone: true,
  selector: 'right-parent',
  imports: [
    RightChildOneComponent,
    RightChildTwoComponent
  ],
  template: `
    <div class="element" id="right-parent-container">
      <h1>Right parent</h1>
      <div class="subcontainer">
      <right-child-one/>
      <right-child-two/>
      </div>
      <button (click)="handleIt()">Click</button>
      {{ changeBg() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightParentComponent {
  #blinkService = inject(BlinkService);

  handleIt() {
    console.log('blub');
  }

  changeBg() {
    this.#blinkService.blink('right-parent-container');
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftParentComponent, RightParentComponent],
  template: `
    <div class="container">
      <left-parent/>
      <right-parent/>
    </div>
    <button (click)="increment()">Increment signal</button>
  `
})
export class AppComponent {
  #signalService = inject(SignalService);

  increment(){
    this.#signalService.someSignal.update(v => v + 1);
  }
}
