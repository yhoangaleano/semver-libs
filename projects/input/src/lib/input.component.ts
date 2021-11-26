import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-input',
  template: `
    <div [class]="contentClass">
      <label [class]="labelClass">{{ label }}</label>
      <input
        [type]="type"
        name="[name]"
        id="[id]"
        [class]="inputClass"
        [style]="inputStyle"
      />
    </div>
  `,
  styles: [],
})
export class InputComponent {
  @Input() label: string;
  @Input() type: string;
  @Input() name: string;
  @Input() id: string;
  @Input() contentClass?: string;
  @Input() labelClass?: string;
  @Input() inputClass?: string;
  @Input() inputStyle?: { [key: string]: string };

  constructor() {
    this.label = "Input label"
    this.type = 'text';
    this.name = 'inputName';
    this.id = 'inputId';
    this.inputStyle = { margin: '10px', padding: '10px' };
  }
}
