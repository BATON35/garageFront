/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { ClientControllerRestService } from './services/client-controller-rest.service';
import { RoleControllerService } from './services/role-controller.service';
import { UserControllerRestService } from './services/user-controller-rest.service';
import { VehicleControllerRestService } from './services/vehicle-controller-rest.service';

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
    ClientControllerRestService,
    RoleControllerService,
    UserControllerRestService,
    VehicleControllerRestService
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
