import { CarServiceDto } from './../../../../api/models/car-service-dto';
import { State, Action, StateContext } from '@ngxs/store';
import { CarServiceControllerRestService } from 'src/api/services';
import { tap } from 'rxjs/operators';
import { PageCarServiceDto } from 'src/api/models';


export class SaveServiceCarAction {
  static readonly type = '[ServiceCar] SaveServiceCarAction';
  constructor(public carServiceDto: CarServiceDto) { }
}
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
  public pageCarServiceDto: PageCarServiceDto;
  public serviceCarAutocomplete: CarServiceDto[];
  public page: number;
  public size: number;
}

@State<ServiceCarStateModel>({
  name: 'serviceCar',
  defaults: {
    pageCarServiceDto: {},
    serviceCarAutocomplete: [],
    page: 0,
    size: 10
  }
})
export class ServiceCarState {
  constructor(public carServiceControllerRestService: CarServiceControllerRestService) { }
  @Action(LoadServiceCarPageAction)
  loadServiceCarPage(ctx: StateContext<ServiceCarStateModel>, { page, size }: LoadServiceCarPageAction) {
    return this.carServiceControllerRestService.getCarServiceListUsingGET({
      size,
      page
    }).pipe(tap(
      serviceCar => ctx.patchState({
        pageCarServiceDto: serviceCar,
        page: page,
        size: size
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
  @Action(SaveServiceCarAction)
  saveServiceCar(ctx: StateContext<ServiceCarStateModel>, { carServiceDto }: SaveServiceCarAction) {
    console.log("service-car !!!!!!!!!")
    return this.carServiceControllerRestService.saveCarServiceUsingPOST(carServiceDto)
      .pipe(tap(serviceCar => ctx.dispatch(new LoadServiceCarPageAction(ctx.getState().page, ctx.getState().size))));
  }
}
