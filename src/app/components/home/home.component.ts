import { WebSocketService } from './../web-socket.service';
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
import { TranslateService } from '@ngx-translate/core';

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
      key: 'userLogin',
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
        'templateOptions.label': this.translateService.stream('home.userlogin.label'),
        'templateOptions.placeholder': this.translateService.stream('home.userlogin.placeholder'),
        'validation.messages.required': this.translateService.stream('home.message.required'),
        'validation.messages.minlength': this.translateService.stream('home.login.message.minlength'),
        'validation.messages.maxlength': this.translateService.stream('home.login.message.maxlength')
      }
    },
    {
      key: 'passwordLogin',
      type: 'input',
      templateOptions: {
        label: 'strange behavior',
        placeholder: 'do not remove',
        validate: true,
        minLength: 3,
        maxLength: 32,
        type: 'password',
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
        'templateOptions.label': this.translateService.stream('home.password.label'),
        'templateOptions.placeholder': this.translateService.stream('home.password.placeholder'),
        'validation.messages.required': this.translateService.stream('home.message.required'),
        'validation.messages.minlength': this.translateService.stream('home.login.message.minlength'),
        'validation.messages.maxlength': this.translateService.stream('home.login.message.maxlength')
      }
    }
  ];

  registerFields: FormlyFieldConfig[] = [
    {
      key: 'userLogin',
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
        'templateOptions.label': this.translateService.stream('home.userlogin.label'),
        'templateOptions.placeholder': this.translateService.stream('home.userlogin.placeholder'),
        'validation.messages.required': this.translateService.stream('home.message.required'),
        'validation.messages.minlength': this.translateService.stream('home.login.message.minlength'),
        'validation.messages.maxlength': this.translateService.stream('home.login.message.maxlength')
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        validate: true,
        label: 'required for expression Properties',
        placeholder: 'required for expression Properties',
        type: 'password',
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
      key: 'confirmPassword',
      type: 'input',
      templateOptions: {
        label: 'required for expression Properties',
        placeholder: 'required for expression Properties',
        type: 'password',
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
        'templateOptions.label': this.translateService.stream('home.signup.password.confirm.label'),
        'templateOptions.placeholder': this.translateService.stream('home.signup.password.confirm.placeholder'),
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
      key: 'name',
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
        'templateOptions.label': this.translateService.stream('home.username.label'),
        'templateOptions.placeholder': this.translateService.stream('home.username.placeholder'),
        'validation.messages.required': this.translateService.stream('home.message.required'),
        'validation.messages.minlength': this.translateService.stream('home.login.message.minlength'),
        'validation.messages.maxlength': this.translateService.stream('home.login.message.maxlength')
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
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'strange behavior',
        placeholder: 'do not remove',
        validate: true,
        pattern: '[_a-zA-Z1-9]+(\\.[A-Za-z0-9]*)*@[A-Za-z0-9]+\\.[A-Za-z0-9]+(\\.[A-Za-z0-9]*)*',
        type: 'emial',
        required: true
      },
      validation: {
        messages: {
          pattern: '',
          required: ''
        }
      },
      expressionProperties: {
        'templateOptions.label': this.translateService.stream('home.signup.emial.label'),
        'templateOptions.placeholder': this.translateService.stream('home.signup.emial.placeholcer'),
        'validation.messages.required': this.translateService.stream('home.message.required'),
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
    }
  ];
  constructor(public store: Store, public translateService: TranslateService, public webSocketService: WebSocketService) { }

  ngOnInit() {
    this.store.dispatch(new LoginFromCookieAction());
    this.webSocketService.connect();
  }

  send() {
    this.webSocketService.send();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  submit() {
    this.store.dispatch(
      new LoginAction(
        this.loginForm.value.userLogin,
        this.loginForm.value.passwordLogin
      )
    );
  }
  register() {
    const userDto = {
      login: this.rejestrationForm.value.userLogin,
      password: this.rejestrationForm.value.password,
      email: this.rejestrationForm.value.email,
      phoneNumber: this.rejestrationForm.value.phoneNumber,
      name: this.rejestrationForm.value.name,
      surname: this.rejestrationForm.value.surname
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
