import { MatPaginatorCustom } from './components/logged/mat-paginator';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsModule } from '@ngxs/store';
import { MenuComponent } from './components/menu/menu.component';
import { LoggedModule } from './components/logged/logged.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './components/public.module';
import { RegistrationModule } from './components/registration/registration.module';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatPaginatorIntl,
  MatBadgeModule
} from '@angular/material';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatBadgeModule,
    MatExpansionModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true })
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorCustom },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
