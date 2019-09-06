import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatTabsModule } from "@angular/material";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./state/auth.state";
import { HttpClientModule } from "@angular/common/http";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { MenuComponent } from "./menu/menu.component";
const routs: Routes = [
  {
    path: "login",
    component: HomeComponent
  }
];
@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild(routs),
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxsModule.forFeature([AuthState]),
    NgxsStoragePluginModule.forRoot({
      key: "auth.jwtToken"
    }),
    HttpClientModule,
    MatTabsModule
  ],
  entryComponents: [HomeComponent]
})
export class PublicModule {}
