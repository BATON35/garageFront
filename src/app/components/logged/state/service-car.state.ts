import { CarServiceDto } from './../../../../api/models/car-service-dto';
import { State, Action, StateContext } from '@ngxs/store';
import { CarServiceControllerRestService } from 'src/api/services';
import { tap } from 'rxjs/operators';
import { PageCarServiceDto } from 'src/api/models';

export class AutocompleteNameServiceCarAction {
  static readonly type = '[ServiceCar] AutocompleteNameServiceCarAction';
  constructor(public text: string) { }
}

export class LoadServiceCarPageAction {
  static readonly type = '[ServiceCar] LoadServiceCarPageAction';
  constructor(public page: number, public size: number) { }
}
export class ServiceCarAction {
  static readonly type = '[ServiceCar] Add item';
  constructor(public payload: string) { }
}

export class ServiceCarStateModel {
  public pageCarServiceDto: PageCarServiceDto
  public serviceCarAutocomplete: CarServiceDto[];
}

@State<ServiceCarStateModel>({
  name: 'serviceCar',
  defaults: {
    pageCarServiceDto: {},
    serviceCarAutocomplete: []
  }
})
export class ServiceCarState {
  constructor(public carServiceControllerRestService: CarServiceControllerRestService) { }
  @Action(LoadServiceCarPageAction)
  loadServiceCarPage(ctx: StateContext<ServiceCarStateModel>, { page, size }: LoadServiceCarPageAction) {
    return this.carServiceControllerRestService.getCarServiceListUsingGET({ size, page }).pipe(tap(serviceCar => ctx.patchState({
      pageCarServiceDto: serviceCar
    })))
  }
  @Action(AutocompleteNameServiceCarAction)
  autocompleteNameServiceCar(ctx: StateContext<ServiceCarStateModel>, { text }: AutocompleteNameServiceCarAction) {
    return this.carServiceControllerRestService.autocompleteCarServiceUsingGET(text).pipe(
      tap(carService => ctx.patchState({
        serviceCarAutocomplete: carService
      }))
    )
  }
}
