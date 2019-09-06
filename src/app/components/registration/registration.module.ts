import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";
import { NgxsModule } from "@ngxs/store";
import { HttpClientModule } from "@angular/common/http";
import { RegistrationComponent } from "./registration.component";
import { UserState } from "../state/user.state";
const routs: Routes = [
  {
    path: "registration",
    component: RegistrationComponent
  }
];
@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild(routs),
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxsModule.forRoot([UserState]),
    HttpClientModule
  ],
  entryComponents: [RegistrationComponent]
})
export class RegistrationModule {}
