import { LogoutAction } from "./../state/auth.state";
import { UserDto } from "./../../../api/models/user-dto";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { Store } from "@ngxs/store";
import { LoginAction, RegistrationAction } from "../state/auth.state";
import { Router } from "@angular/router";
import { takeUntil, tap } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  loginForm = new FormGroup({});
  rejestrationForm = new FormGroup({});
  loginFields: FormlyFieldConfig[] = [
    {
      key: "userName",
      type: "input",
      templateOptions: {
        label: "nazwa urzytkownika",
        placeholder: "nazwa urzytkownika",
        required: true
      }
    },
    {
      key: "password",
      type: "input",
      templateOptions: {
        type: "password",
        label: "haslo",
        placeholder: "haslo",
        required: true
      }
    }
  ];

  registerFields: FormlyFieldConfig[] = [
    {
      key: "userName",
      type: "input",
      templateOptions: {
        label: "nazwa urzytkownika",
        placeholder: "nazwa urzytkownika",
        required: true,
        minLength: 3
      }
    },
    {
      key: "password",
      type: "input",
      templateOptions: {
        type: "password",
        label: "haslo",
        placeholder: "haslo",
        required: true,
        minLength: 6,
        maxLength: 34
      }
    },
    {
      key: "confirmPassword",
      type: "input",
      templateOptions: {
        type: "password",
        label: "confirm pasword",
        placeholder: "confirmPassword",
        required: true
      },
      validators: {
        fieldMatch: {
          expression: control =>
            control.value === this.rejestrationForm.value.password,
          message: "hasla nie są identyczne"
        }
      },
      expressionProperties: {
        "templateOptions.disabled": () =>
          !this.rejestrationForm.get("password").valid
      },
      lifecycle: {
        onInit: (form, field) => {
          form
            .get("password")
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
      key: "email",
      type: "input",
      templateOptions: {
        validate: true,
        pattern: "[_a-zA-Z1-9]+(\\.[A-Za-z0-9]*)*@[A-Za-z0-9]+\\.[A-Za-z0-9]+(\\.[A-Za-z0-9]*)*",
        type: "emial",
        label: "email urzytkownika",
        placeholder: "email urzytkownika",
        required: true
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" nie jest poprawnym adresem email`
        }
      }
    },
    {
      key: "telNumer",
      type: "input",
      templateOptions: {
        label: "numer telefonu urzytkownika",
        placeholder: "numer telefonu urzytkownika",
        required: false
      }
    }
  ];
  constructor(public store: Store, public router: Router) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  submit() {
    this.store.dispatch(
      new LoginAction(
        this.loginForm.value.userName,
        this.loginForm.value.password
      )
    );
  }
  redirectToRejestratration() {
    this.router.navigate(["/registration"]);
  }
  register() {
    let userDto = {
      name: this.rejestrationForm.value.userName,
      password: this.rejestrationForm.value.password,
      email: this.rejestrationForm.value.email
    };
    console.log(userDto);
    console.log(this.rejestrationForm);
    this.store.dispatch(new RegistrationAction(userDto));
  }
}
