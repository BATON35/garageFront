/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { CarServiceControllerRestService } from './services/car-service-controller-rest.service';
import { ClientControllerRestService } from './services/client-controller-rest.service';
import { MailTemplateControllerRestService } from './services/mail-template-controller-rest.service';
import { FileControllerService } from './services/file-controller.service';
import { RoleControllerService } from './services/role-controller.service';
import { ServicePartControllerRestService } from './services/service-part-controller-rest.service';
import { UserControllerRestService } from './services/user-controller-rest.service';
import { VehicleControllerRestService } from './services/vehicle-controller-rest.service';
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
    MailTemplateControllerRestService,
    FileControllerService,
    RoleControllerService,
    ServicePartControllerRestService,
    UserControllerRestService,
    VehicleControllerRestService,
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
