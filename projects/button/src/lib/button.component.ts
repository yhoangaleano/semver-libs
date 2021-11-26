import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: ` <button (click)="showMessage()">Button Works! {{ label }}</button> `,
  styles: [],
})
export class ButtonComponent {
  @Input() label: string;

  constructor() {
    this.label = 'Add';
  }

  public showMessage(): void {
    console.log('BREAKING CHANGE: `extends` key in config file is now used for extending other config files');
  }
}
