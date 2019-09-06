import { AuthGuard } from "./../../guart/auth.guard";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatTabsModule } from "@angular/material";

const routs: Routes = [
  {
    path: "panel",
    component: ControlPanelComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild(routs),
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  entryComponents: [ControlPanelComponent],
  providers: [AuthGuard]
})
export class LoggedModule {}
