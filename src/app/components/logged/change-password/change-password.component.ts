import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ChangePasswordAction } from '../users.state';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassword = new FormGroup({});
  passwordFields: FormlyFieldConfig[] = [
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Zmien hasło',
        placeholder: 'Zmien hasło',
        type: 'password',
        required: true,
        minLength: 6,
        maxLength: 34
      }
    },
    {
      key: 'confirmPassword',
      type: 'input',
      templateOptions: {
        label: 'Powtórz hasło',
        placeholder: 'Powtórz hasło',
        type: 'password',
        required: true
      },
      validators: {
        fieldMatch: {
          expression: control =>
            control.value === this.changePassword.value.password,
          message: 'hasla nie są identyczne'
        }
      }
    }
  ];

  constructor(public store: Store) { }

  ngOnInit() {
  }
  submit() {
    this.store.dispatch(new ChangePasswordAction(this.changePassword.value.password));
  }

}
