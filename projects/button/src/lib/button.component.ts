import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: `
    <p>
      Button Works! {{label}}
    </p>
  `,
  styles: [
  ]
})
export class ButtonComponent {
  @Input() label: string;

  constructor() {
    this.label = 'Add';
  }
}
