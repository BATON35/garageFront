import { WorkerState } from './state/worker.state';
import { VehicleState } from './vehicle.state';
import { VehicleCreateComponent } from './vehicle-create/vehicle-create.component';
import { AuthGuard } from './../../guart/auth.guard';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatCardModule,
  MatSidenavModule
} from '@angular/material';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './users.state';
import { UserCreateComponent } from './user-create/user-create.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientState } from './client.state';
import { UserListComponent } from './user-list/user-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { ServicePartComponent } from './service-part/service-part.component';
import { PartComponent } from './part/part.component';
import { PartState } from './state/part.state';
import { ServicePartState } from './state/service-part.state';
import { ServiceCarComponent } from './service-car/service-car.component';
import { ServiceCarState } from './state/service-car.state';
import { PartCreateComponent } from './part-create/part-create.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from 'selenium-webdriver/http';

const routs: Routes = [
  {
    path: 'panel',
    component: ControlPanelComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  {
    path: 'parts',
    component: PartComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_USER']
    }
  },
  {
    path: 'service-part',
    component: ServicePartComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_USER']
    }
  },
  {
    path: 'service-car',
    component: ServiceCarComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_USER']
    }
  }
];
@NgModule({
  declarations: [
    ControlPanelComponent,
    UserListComponent,
    UserCreateComponent,
    ClientCreateComponent,
    ClientListComponent,
    VehicleCreateComponent,
    VehicleDetailsComponent,
    ServicePartComponent,
    PartComponent,
    ServiceCarComponent,
    PartCreateComponent


  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routs),
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxsModule.forFeature([UsersState, ClientState, VehicleState, PartState, ServicePartState, ServiceCarState, WorkerState]),
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    TranslateModule,

  ],
  entryComponents: [
    ControlPanelComponent,
    UserCreateComponent,
    ClientCreateComponent,
    ClientListComponent,
    VehicleCreateComponent,
    VehicleDetailsComponent,
    ServicePartComponent,
    PartCreateComponent
  ],
  providers: [AuthGuard]
})
export class LoggedModule { }
