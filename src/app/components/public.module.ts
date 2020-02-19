import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
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
import { TranslateModule } from '@ngx-translate/core';
const routs: Routes = [
  {
    path: 'login',
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
    HttpClientModule,
    MatTabsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule,
    TranslateModule
  ],
  entryComponents: [HomeComponent]
})
export class PublicModule { }
