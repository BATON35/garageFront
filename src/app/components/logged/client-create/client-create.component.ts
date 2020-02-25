import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientCreateAction } from '../client.state';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  clientForm = new FormGroup({});
  clientFields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        require: true
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('client.add.name.label'),
        'templateOptions.placeholder': this.translateService.stream('client.add.name.placeholder')
      }
    },
    {
      key: 'surname',
      type: 'input',
      templateOptions: {
        label: 'strange behavior',
        placeholder: 'do not remove',
        validate: true,
        minLength: 3,
        maxLength: 32,
        required: true
      },
      validation: {
        messages: {
          minLength: '',
          maxLength: '',
          required: ''
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('home.usersurname.label'),
        'templateOptions.placeholder': this.translateService.stream('home.usersurname.placeholder'),
        'validation.messages.required': this.translateService.stream('home.message.required'),
        'validation.messages.minlength': this.translateService.stream('home.login.message.minlength'),
        'validation.messages.maxlength': this.translateService.stream('home.login.message.maxlength')
      }
    },
    {
      key: 'phoneNumber',
      type: 'input',
      templateOptions: {
        validate: true,
        pattern: '^(\\d{3}-{0,1}\\d{3}-{0,1}\\d{3})+$',
        typt: 'tel',
        label: 'strange behavior',
        placeholder: 'do not remove',
        required: true
      },
      validation: {
        messages: {
          pattern: '',
          // pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" nie jest poprawnym numerem telefonu`
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('home.signup.phone.label'),
        'templateOptions.placeholder': this.translateService.stream('home.signup.phone.placeholder'),
        'validation.messages.pattern': this.translateService.stream('home.login.message.pattern')
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        validate: true,
        pattern: '[_a-zA-Z1-9]+(\\.[A-Za-z0-9]*)*@[A-Za-z0-9]+\\.[A-Za-z0-9]+(\\.[A-Za-z0-9]*)*',
        type: 'emial',
        label: 'Email urzytkownika',
        placeholder: 'Email urzytkownika',
        required: true
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" nie jest poprawnym adresem email`
        }
      }
    }
  ];

  constructor(
    public store: Store,
    public matDialogRef: MatDialogRef<ClientCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public clientDto,
    public translateService: TranslateService) { }

  ngOnInit() {
  }

  submit() {
    this.store.dispatch(
      new ClientCreateAction(
        {
          name: this.clientForm.value.name,
          email: this.clientForm.value.email,
          // surname: this.clientDto.value.surname,
          // phoneNumber: this.clientDto.value.phoneNumber,
          // vehicles: this.clientDto.value.vehicles,
        }
      )
    );
    this.matDialogRef.close();
  }

}
