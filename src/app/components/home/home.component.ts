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
          message: "haslo nie poprawne"
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
        type: "emial",
        label: "email urzytkownika",
        placeholder: "email urzytkownika",
        required: false
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
  constructor(public store: Store, public router: Router) {}

  ngOnInit() {}

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
