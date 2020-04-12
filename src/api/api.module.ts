/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { CarServiceControllerRestService } from './services/car-service-controller-rest.service';
import { ClientControllerRestService } from './services/client-controller-rest.service';
import { FileControllerService } from './services/file-controller.service';
import { JobControllerService } from './services/job-controller.service';
import { MailTemplateControllerRestService } from './services/mail-template-controller-rest.service';
import { RoleControllerService } from './services/role-controller.service';
import { UserControllerRestService } from './services/user-controller-rest.service';
import { VehicleControllerRestService } from './services/vehicle-controller-rest.service';
import { NotificationControllerService } from './services/notification-controller.service';
import { WorkerControllerRestService } from './services/worker-controller-rest.service';
import { PartControllerRestService } from './services/part-controller-rest.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    CarServiceControllerRestService,
    ClientControllerRestService,
    FileControllerService,
    JobControllerService,
    MailTemplateControllerRestService,
    RoleControllerService,
    UserControllerRestService,
    VehicleControllerRestService,
    NotificationControllerService,
    WorkerControllerRestService,
    PartControllerRestService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
