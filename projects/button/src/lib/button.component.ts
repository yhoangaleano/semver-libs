import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: `
    <div [class]="contentClass">
      <button (click)="showMessage()">Button Works! {{ label }}</button>
    </div>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() label: string;
  @Input() contentClass!: string;

  constructor() {
    this.label = 'Add feature';
  }

  public showMessage(): void {
    console.log(this.label);
  }
}
