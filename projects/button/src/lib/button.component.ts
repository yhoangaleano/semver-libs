import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: ` <button (click)="showMessage()">Button Works! {{ label }}</button> `,
  styles: [],
})
export class ButtonComponent {
  @Input() label: string;

  constructor() {
    this.label = 'Add feature';
  }

  public showMessage(): void {
    console.log(this.label);
  }
}
