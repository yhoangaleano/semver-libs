import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: `
    <div [class]="contentClass">
      <button (click)="showMessage()">{{ nameButton }}</button>
    </div>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() nameButton: string;
  @Input() contentClass!: string;

  constructor() {
    this.nameButton = 'Button label';
  }

  public showMessage(): void {
    console.log(this.nameButton);
  }
}
