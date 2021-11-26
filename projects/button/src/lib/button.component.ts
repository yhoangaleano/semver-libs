import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: ` <button>Button Works! {{ label }}</button> `,
  styles: [],
})
export class ButtonComponent {
  @Input() label: string;

  constructor() {
    this.label = 'Add';
  }
}
