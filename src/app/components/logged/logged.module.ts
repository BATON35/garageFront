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
  MatSidenavModule,
  MatSnackBarModule,
  MatSelectModule
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
import { PartComponent } from './part/part.component';
import { PartState } from './state/part.state';
import { JobState } from './state/job.state';
import { ServiceCarComponent } from './service-car/service-car.component';
import { ServiceCarState } from './state/service-car.state';
import { PartCreateComponent } from './part-create/part-create.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import { FileState } from './state/file.state';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { JobComponent } from './job/job.component';
import { ChartsModule } from 'ng2-charts';
import { WorkerStatisticComponent } from './worker-statistic/worker-statistic.component';
import { WorkerStatisticState } from './state/worker-statistic.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';


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
    path: 'job',
    component: JobComponent,
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
  },
  {
    path: 'worker-statistic',
    component: WorkerStatisticComponent,
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
    JobComponent,
    PartComponent,
    ServiceCarComponent,
    PartCreateComponent,
    VehicleHistoryComponent,
    ServiceCreateComponent,
    WorkerStatisticComponent


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
    NgxsModule.forFeature([
      UsersState, ClientState, VehicleState, PartState, JobState, ServiceCarState, WorkerState, FileState, WorkerStatisticState
    ]),
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
    ChartsModule,
    MatSnackBarModule,
    MatSelectModule,
    NgxsReduxDevtoolsPluginModule.forRoot()

  ],
  entryComponents: [
    ControlPanelComponent,
    UserCreateComponent,
    ClientCreateComponent,
    ClientListComponent,
    VehicleCreateComponent,
    VehicleDetailsComponent,
    JobComponent,
    PartCreateComponent,
    VehicleHistoryComponent,
    ServiceCreateComponent
  ],
  providers: [
    AuthGuard
  ]

})
export class LoggedModule { }
