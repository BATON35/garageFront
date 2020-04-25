import {State, Action, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {CarControllerRestService} from '../../../../api/services/car-controller-rest.service';

export class GetBrandAction {
  static readonly type = '[Car] GetBrandAction';

  constructor() {
  }
}

export class GetModelAction {
  static readonly type = '[Car] GetModelAction';

  constructor(public model: string) {
  }
}

export class GetProductionDateAction {
  static readonly type = '[Car] GetProductionDAte';

  constructor(public brand: string, public model: string) {
  }
}

export class CarStateModel {
  public brands: string[];
  public models: string[];
  public productionDate: string[];
}

@State<CarStateModel>({
  name: 'car',
  defaults: {
    brands: [],
    models: [],
    productionDate: []
  }
})
export class CarState {

  constructor(public carControllerRestService: CarControllerRestService) {
  }

  @Action(GetBrandAction)
  getBrand(ctx: StateContext<CarStateModel>, {}: GetBrandAction) {
    return this.carControllerRestService.getBrandUsingGET().pipe(
      tap(brands => ctx.patchState({
        brands,
        models: [],
        productionDate: []
      }))
    );
  }

  @Action(GetModelAction)
  getModel(ctx: StateContext<CarStateModel>, {model}: GetModelAction) {
    return this.carControllerRestService.getModelUsingGET(model).pipe(
      tap(models => ctx.patchState({
        models,
        productionDate: []
      }))
    );
  }

  @Action(GetProductionDateAction)
  getProductionDate(ctx: StateContext<CarStateModel>, {brand, model}: GetProductionDateAction) {
    return this.carControllerRestService.getProductionDateUsingGET({brand, model}).pipe(
      tap(productionDate => ctx.patchState({
        productionDate
      }))
    );
  }
}
