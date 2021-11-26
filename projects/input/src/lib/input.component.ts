import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-input',
  template: ` <input [type]="type" name="[name]" id="[id]" [class]="styleClass" /> `,
  styles: [],
})
export class InputComponent {
  @Input() type: string;
  @Input() name: string;
  @Input() id: string;
  @Input() styleClass?:  string;

  constructor() {
    this.type = 'text';
    this.name = 'inputName';
    this.id = 'inputId';
  }
}
