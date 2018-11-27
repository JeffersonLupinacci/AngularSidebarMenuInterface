import { FormControl, Validators, MinLengthValidator, ValidatorFn, Validator } from '@angular/forms';
import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-message-validation',
  template: `
    <div class="ui-message ui-messages-error ui-corner-all" style="margin-top:5px; font-size:10px; background-color:white;"
      *ngIf="showError()">
      <i class="fa fa-close"></i>
      {{text}}
    </div>
  `,
  styles: [`

  `],
  encapsulation: ViewEncapsulation.None
})
export class MessageValidationComponent {

  @Input() control: FormControl;
  @Input() error: string;
  @Input() text: string;

  showError(): boolean {

    if ((this.control.errors) &&
      (this.control.errors['minlength'] instanceof Object)) {
      this.text = `Informar no mínimo ${this.control.errors['minlength'].requiredLength} caracteres`;
    }

    if (this.error === 'email') {
      this.text = `O preenchimento do e-mail é obrigatório`;
    } else if (this.error === 'required') {
      this.text = `O preenchimento é obrigatório`;
    }

    return (this.control.hasError(this.error) && this.control.dirty);
  }

}
