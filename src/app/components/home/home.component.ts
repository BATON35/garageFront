import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Store, Select } from '@ngxs/store';
import {
  LoginAction,
  RegistrationAction,
  ErrorRegistrationToFalseAction,
  ErrorLoginToFalseAction,
  LoginFromCookieAction
} from '../state/auth.state';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(state => state.auth.errorLogin)
  errorLogin$: Observable<boolean>;
  @Select(state => state.auth.errorRegister)
  errorRegister$: Observable<boolean>;
  onDestroy$ = new Subject<void>();
  loginForm = new FormGroup({});
  rejestrationForm = new FormGroup({});
  selectedIndex = 0;
  loginFields: FormlyFieldConfig[] = [
    {
      key: 'userNameLogin',
      type: 'input',
      templateOptions: {
        label: 'nazwa urzytkownika',
        placeholder: 'nazwa urzytkownika',
        required: true
      }
    },
    {
      key: 'passwordLogin',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'haslo',
        placeholder: 'haslo',
        required: true
      }
    }
  ];

  registerFields: FormlyFieldConfig[] = [
    {
      key: 'userName',
      type: 'input',
      templateOptions: {
        label: 'nazwa urzytkownika',
        placeholder: 'nazwa urzytkownika',
        required: true,
        minLength: 3
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'haslo',
        placeholder: 'haslo',
        required: true,
        minLength: 6,
        maxLength: 34
      }
    },
    {
      key: 'confirmPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'confirm pasword',
        placeholder: 'confirmPassword',
        required: true
      },
      validators: {
        fieldMatch: {
          expression: control =>
            control.value === this.rejestrationForm.value.password,
          message: 'hasla nie są identyczne'
        }
      },
      expressionProperties: {
        'templateOptions.disabled': () =>
          !this.rejestrationForm.get('password').valid
      },
      lifecycle: {
        onInit: (form, field) => {
          form
            .get('password')
            .valueChanges.pipe(
              takeUntil(this.onDestroy$),
              tap(() => {
                field.formControl.updateValueAndValidity();
              })
            )
            .subscribe();
        }
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
      key: 'telNumer',
      type: 'input',
      templateOptions: {
        validate: true,
        pattern: '^(\\d{3}-{0,1}\\d{3}-{0,1}\\d{3})+$',
        typt: 'tel',
        label: 'numer telefonu',
        placeholder: 'numer telefonu urzytkownika',
        required: true
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" nie jest poprawnym numerem telefonu`
        }
      }
    }
  ];
  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoginFromCookieAction());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  submit() {
    this.store.dispatch(
      new LoginAction(
        this.loginForm.value.userNameLogin,
        this.loginForm.value.passwordLogin
      )
    );
  }
  register() {
    const userDto = {
      name: this.rejestrationForm.value.userName,
      password: this.rejestrationForm.value.password,
      email: this.rejestrationForm.value.email
    };
    this.store.dispatch(new RegistrationAction(userDto));
    this.selectedIndex = 0;
  }
  clearForm(event) {
    if (event === 0) {
      this.store.dispatch(new ErrorRegistrationToFalseAction());
      this.rejestrationForm.reset();
      Object.keys(this.rejestrationForm.controls).forEach(key => {
        this.rejestrationForm.get(key).setErrors(null);
      });
    } else {
      this.store.dispatch(new ErrorLoginToFalseAction());
      this.loginForm.reset();
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key).setErrors(null);
      });
    }
  }
}
