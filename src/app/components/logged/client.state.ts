import { tap } from 'rxjs/operators';
import { ClientDto } from './../../../api/models/client-dto';
import { State, Action, StateContext } from '@ngxs/store';
import { ClientControllerRestService } from 'src/api/services';
import { PageClientDto } from 'src/api/models';

const name = "[Clients]"
export class ClietnPageAction {
  static readonly type = '${name} clietPage';
  constructor(public page: number, public size: number) { }
}

export class ClientUpdateAction {
  static readonly type = '${name} update client';
  constructor(public clientDto: ClientDto) { }
}

export class ClientDeleteAction {
  static readonly type = '${name} add client';
  constructor(public id: number) { }
}

export class ClientStateModel {
  public pageClientDto: PageClientDto
  public page: number
  public size: number
}

@State<ClientStateModel>({
  name: 'client',
  defaults: {
    pageClientDto: {},
    page: 0,
    size: 5
  }
})

export class ClientState {
  constructor(public clientService: ClientControllerRestService) { }

  @Action(ClietnPageAction)
  page(ctx: StateContext<ClientStateModel>, { page, size }: ClietnPageAction) {
    if (!page && !size) {
      page = ctx.getState().page
      size = ctx.getState().size

    }
    return this.clientService
      .getListUsingGET({ size, page }).pipe(tap(
        value => {
          ctx.patchState({
            pageClientDto: value,
            page,
            size
          })
        }
      ))
  }

  @Action(ClientDeleteAction)
  delete(ctx: StateContext<ClientStateModel>, { id }: ClientDeleteAction) {
    return this.clientService.deleteUsingDELETE(id).pipe(tap(
      value => {
        const page = ctx.getState().page
        const size = ctx.getState().size
        ctx.dispatch(new ClietnPageAction(page, size))
      }
    ))
  }

  @Action(ClientUpdateAction)
  upadate(ctx: StateContext<ClientStateModel>, clientDto: ClientUpdateAction) {
    return this.clientService.saveUsingPOST(clientDto.clientDto).pipe(
      tap(
        client => {
          const page = ctx.getState().page
          const size = ctx.getState().size
          ctx.dispatch(new ClietnPageAction(page, size))
        })
    )
  }
}
