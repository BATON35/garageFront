import { UserDto } from './../../../../api/models/user-dto';
import { ClearUserAction, UserCreateAction } from './../users.state';
import { Store, Select } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

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
        label: 'Imie Urzytkownika',
        Placeholder: 'Imie Urzytkownika',
        require: true
      }
    },
    {
      key: 'login',
      type: 'input',
      templateOptions: {
        label: 'Login Urzytkownika',
        Placeholder: 'Login Urzytkownika',
        require: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Haslo urzytkownika',
        Placeholder: 'Haslo urzytkownika',
        require: true
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
    },
    {
      key: 'roles',
      type: 'select',
      templateOptions: {
        label: 'Wybierz role',
        Placeholder: 'Rola urzytkownika',
        description: 'Urzytkownik powinien posiadac role',
        require: false,
        multiple: true,
        options: [
          { value: 'ROLE_ADMIN', label: 'Admin' },
          { value: 'ROLE_USER', label: 'User' },
          { value: 'ROLE_EMPLOYEE', label: 'Employee' }
        ]
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
    public matSnackBar: MatSnackBar) { }

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
          password: this.userForm.value.password,
          email: this.userForm.value.email,
          roles: this.userForm.value.roles.map(role => {
            return { name: role };
          })
        }
      )
    );
  }

}
