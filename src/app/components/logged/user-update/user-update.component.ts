import { Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserDto } from 'src/api/models';
import { UserUpdateAction, ClearUserAction } from '../users.state';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit, OnDestroy, AfterViewChecked {

  userTemp: any;
  userUpdateForm = new FormGroup({});
  userUpdateFields: FormlyFieldConfig[] = [
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
    // {
    //   key: 'password',
    //   type: 'input',
    //   templateOptions: {
    //     validate: true,
    //     pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{2,}$'
    //   },
    //   validation: {
    //     messages: {
    //     }
    //   },
    //   expressionProperties: {
    //     'templateOptions.label': this.translateService.stream('user.password.label'),
    //     'templateOptions.placeholder': this.translateService.stream('user.password.placeholder'),
    //     'validation.messages.pattern': this.translateService.stream('user.update.message.pattern')
    //   }
    // },
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
        typ: 'tel',
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
    public matDialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: UserDto,
    public matSnackBar: MatSnackBar,
    public changeDetectorRef: ChangeDetectorRef,
    public translateService: TranslateService) { }

  ngOnInit() {
    if (this.userDto) {
      this.ok$.subscribe(element => {
        if (element === true) {
          this.matSnackBar.open('zapisano', 'zamknij', { duration: 1000 });
          this.matDialogRef.close();
          this.store.dispatch(new ClearUserAction());
        }
      });
      this.userTemp = {
        name: this.userDto.name,
        surname: this.userDto.surname,
        email: this.userDto.email,
        phoneNumber: this.userDto.phoneNumber,
        roles: this.userDto.roles.map(role => role.name)
      };
    }

  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy(): void {

  }
  updateUser() {
    this.store.dispatch(new UserUpdateAction(
      {
        id: this.userDto !== null ? this.userDto.id : null,
        name: this.userUpdateForm.value.name,
        surname: this.userUpdateForm.value.surname,
        email: this.userUpdateForm.value.email,
        phoneNumber: this.userUpdateForm.value.phoneNumber,
        roles: this.userUpdateForm.value.roles.map(role => {
          return { name: role };
        }),
      }
    ));
  }
}
