import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './state/auth.state';
import { HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
const routs: Routes = [
  {
    path: 'login',
    component: HomeComponent
  }
];

export function minlengthValidationMessage(err, field) {
  return `Pole powinno zawierać przynajmniej  ${field.templateOptions.minLength} znakow`;
}

export function maxlengthValidationMessage(err, field) {
  return `Pole może zawierac ${field.templateOptions.maxLength} znaków`;
}

export function minValidationMessage(err, field) {
  return `Ta wartosc powinna byc wieksza niż ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `Ta wartosc powinna byc mniejsza niż ${field.templateOptions.max}`;
}
@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild(routs),
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'To pole nie może pozostac puste' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
    }),
    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxsModule.forFeature([AuthState]),
    HttpClientModule,
    MatTabsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  entryComponents: [HomeComponent]
})
export class PublicModule { }
