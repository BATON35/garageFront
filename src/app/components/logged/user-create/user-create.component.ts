import { UserDto } from './../../../../api/models/user-dto';
import { UserUpdateAction } from './../users.state';
import { Store } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { LoginAction } from '../../state/auth.state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userForm = new FormGroup({});
  userFields: FormlyFieldConfig[] = [
    {
      key: "name",
      type: "input",
      templateOptions: {
        label: "nazwa Urzytkownika",
        Placeholder: "nazwa Urzytkownika",
        require: true
      }
    },
    {
      key: "password",
      type: "input",
      templateOptions: {
        type: "password",
        label: "haslo urzytkownika",
        Placeholder: "haslo urzytkownika",
        require: true
      }
    },
    {
      key: "email",
      type: "input",
      templateOptions: {
        label: "emial urzytkownika",
        Placeholder: "email urzytkownika",
        require: true
      }
    },
    {
      key: "roles",
      type: "select",
      templateOptions: {
        label: "wybierz role",
        Placeholder: "rola urzytkownika",
        description: "urzytkownik powinien posiadac role",
        require: false,
        options: [
          { value: "1", label: "Admin" },
          { value: "2", label: "User" },
          { value: "3", label: "Employee" }
        ]
      }
    }
  ]
  constructor(public store: Store, public matDialogRef: MatDialogRef<UserCreateComponent>, @Inject(MAT_DIALOG_DATA) public userDto: UserDto) { }
  ngOnInit() {
  }

  submit() {
    this.store.dispatch(
      new UserUpdateAction(
        {
          id: this.userDto !== null ? this.userDto.id : null,
          name: this.userForm.value.name,
          password: this.userForm.value.password,
          email: this.userForm.value.email,
          roles: [this.userForm.value.roles]
        }
      )
    )
    this.matDialogRef.close();
  }

}
