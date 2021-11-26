import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-input',
  template: `
    <input [type]="type" name="[name]" id="[id]" [class]="styleClass" [style]="style" />
  `,
  styles: [],
})
export class InputComponent {
  @Input() type: string;
  @Input() name: string;
  @Input() id: string;
  @Input() styleClass?: string;
  @Input() style?: { [key: string]: string };

  constructor() {
    this.type = 'text';
    this.name = 'inputName';
    this.id = 'inputId';
    this.style = { margin: '10px', padding: '10px' };
  }
}
