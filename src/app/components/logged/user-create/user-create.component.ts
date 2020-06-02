import { UserDto } from './../../../../api/models/user-dto';
import { ClearUserAction, UserCreateAction } from './../users.state';
import { Store, Select } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  userTemp: any;
  model: any;
  userForm = new FormGroup({});
  userFields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('user.update.name.label'),
        'templateOptions.placeholder': this.translateService.stream('user.update.name.placeholder')
      }
    },
    {
      key: 'surname',
      type: 'input',
      templateOptions: {
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('user.update.surname.label'),
        'templateOptions.placeholder': this.translateService.stream('user.update.surname.placeholder')
      }
    },
    {
      key: 'login',
      type: 'input',
      templateOptions: {
        required: true,
        validate: true
      },
      validation: {
        messages: {
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('user.update.login.label'),
        'templateOptions.placeholder': this.translateService.stream('user.update.login.placeholder'),
        'validation.messages.required': this.translateService.stream('user.update.message.required')
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        validate: true,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{2,}$'
      },
      validation: {
        messages: {
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('user.password.label'),
        'templateOptions.placeholder': this.translateService.stream('user.password.placeholder'),
        'validation.messages.pattern': this.translateService.stream('user.update.message.pattern')
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        validate: true,
        pattern: '[_a-zA-Z1-9]+(\\.[A-Za-z0-9]*)*@[A-Za-z0-9]+\\.[A-Za-z0-9]+(\\.[A-Za-z0-9]*)*',
        required: true
      },
      validation: {
        messages: {
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('user.update.email.label'),
        'templateOptions.placeholder': this.translateService.stream('user.update.email.placeholder'),
        'validation.messages.pattern': this.translateService.stream('home.signup.message.email.patter')
      }
    },
    {
      key: 'phoneNumber',
      type: 'input',
      templateOptions: {
        validate: true,
        pattern: '^(\\d{3}-{0,1}\\d{3}-{0,1}\\d{3})+$',
        typt: 'tel',
      },
      validation: {
        messages: {
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('user.update.phone.number.label'),
        'templateOptions.placeholder': this.translateService.stream('user.update.phone.number.placeholder'),
        'validation.messages.pattern': this.translateService.stream('home.login.message.pattern')
      }
    },
    {
      key: 'roles',
      type: 'select',
      templateOptions: {
        label: 'Wybierz role',
        Placeholder: 'Rola urzytkownika',
        required: true,
        multiple: true,
        options: [
          { value: 'ROLE_ADMIN', label: 'Admin' },
          { value: 'ROLE_USER', label: 'User' },
          { value: 'ROLE_EMPLOYEE', label: 'Employee' }
        ]
      },
      validation: {
        messages: {
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('user.update.roles.label'),
        'templateOptions.placeholder': this.translateService.stream('user.update.roles.placeholder'),
        'validation.messages.required': this.translateService.stream('user.update.roles.message.required'),
        'templateOptions.options[0].label': this.translateService.stream('ROLE_ADMIN'),
        'templateOptions.options[1].label': this.translateService.stream('ROLE_USER'),
        'templateOptions.options[2].label': this.translateService.stream('ROLE_EMPLOYEE'),
      }
    }
  ];

  @Select(state => state.users.ok)
  ok$: Observable<boolean>;
  @Select(state => state.users.errorMessage)
  errorMessage$: Observable<string>

  constructor(
    public store: Store,
    public matDialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: UserDto,
    public matSnackBar: MatSnackBar,
    public translateService: TranslateService) { }

  ngOnInit() {
    if (this.userDto) {
      this.userTemp = {
        name: this.userDto.name,
        email: this.userDto.email,
        password: this.userDto.password,
        roles: this.userDto.roles.map(role => role.name)
      };
    }
    this.ok$.subscribe(element => {
      if (element === true) {
        this.matSnackBar.open('zapisano', 'zamknij', { duration: 2000 });
        this.matDialogRef.close();
      }
    });
  }
  ngOnDestroy() {
    this.store.dispatch(new ClearUserAction());
  }

  createUser() {
    this.store.dispatch(
      new UserCreateAction(
        {
          login: this.userForm.value.login,
          name: this.userForm.value.name,
          surname: this.userForm.value.surname,
          password: this.userForm.value.password,
          email: this.userForm.value.email,
          phoneNumber: this.userForm.value.phoneNumber,
          roles: this.userForm.value.roles.map(role => {
            return { name: role };
          })
        }
      )
    );
  }

}
