import { WorkerDto } from './../../../../api/models/worker-dto';
import { State, Action, StateContext } from '@ngxs/store';
import { AutocompleteNameServiceCarAction } from './service-car.state';
import { WorkerControllerRestService } from 'src/api/services';
import { tap } from 'rxjs/operators';

export class AutocompleteNameWorkerAction {
  static readonly type = '[Worker] AutocompleteNameWorkerAction';
  constructor(public text: string) { }
}

export class WorkerStateModel {
  public autocompleteWorker: WorkerDto[]
}

@State<WorkerStateModel>({
  name: 'worker',
  defaults: {
    autocompleteWorker: []
  }
})
export class WorkerState {
  constructor(public workerService: WorkerControllerRestService) { }
  @Action(AutocompleteNameWorkerAction)
  autocompleteNameWorker(ctx: StateContext<WorkerStateModel>, { text }: AutocompleteNameServiceCarAction) {
    return this.workerService.autocompleteWorkerUsingGET(text).pipe(
      tap(worker => ctx.patchState({
        autocompleteWorker: worker
      }))
    )
  }
}

