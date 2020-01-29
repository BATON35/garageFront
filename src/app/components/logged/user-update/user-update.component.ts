import { Component, OnInit, Inject, AfterViewChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserDto } from 'src/api/models';
import { UserUpdateAction, ClearUserAction } from '../users.state';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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
        label: 'nazwa Urzytkownika',
        Placeholder: 'nazwa Urzytkownika',
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
        label: 'email urzytkownika',
        placeholder: 'email urzytkownika',
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
        label: 'wybierz role',
        Placeholder: 'rola urzytkownika',
        description: 'urzytkownik powinien posiadac role',
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
    public matDialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: UserDto,
    public matSnackBar: MatSnackBar,
    public changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.userDto) {
      this.ok$.subscribe(element => {
        console.log('ok$')
        if (element === true) {
          console.log("in if")
          this.matSnackBar.open('zapisano', 'zamknij', { duration: 2000 });
          this.matDialogRef.close();
          this.store.dispatch(new ClearUserAction());
        }
      });
      this.userTemp = {
        name: this.userDto.name,
        email: this.userDto.email,
        password: this.userDto.password,
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
        email: this.userUpdateForm.value.email,
        roles: this.userUpdateForm.value.roles.map(role => {
          return { name: role };
        })
      }
    ));
    console.log("user-update.component.ts");
    console.log(this.userDto);
  }
}
