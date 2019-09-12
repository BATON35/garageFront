import { NgxsModule } from '@ngxs/store';
import { MenuComponent } from "./components/menu/menu.component";
import { LoggedModule } from "./components/logged/logged.module";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PublicModule } from "./components/public.module";
import { RegistrationModule } from "./components/registration/registration.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule
} from "@angular/material";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    RegistrationModule,
    LoggedModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    NgxsModule.forRoot([]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
