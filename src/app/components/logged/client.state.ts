import { state } from '@angular/animations';
import { tap } from 'rxjs/operators';
import { ClientDto } from './../../../api/models/client-dto';
import { State, Action, StateContext } from '@ngxs/store';
import { ClientControllerRestService } from 'src/api/services';
import { PageClientDto } from 'src/api/models';

const name = '[Clients]';
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

export class ClientSearchAction {
  static readonly type = '${name} search client';
  constructor(public searchText: string) { }
}

export class AutocompleteAction {
  static readonly type = '${name} autocomplete client';
  constructor(public autocomplete: string) { }
}

export class BackToDefoultClientAction {
  static readonly type = '${name} back to tefoult client';
  constructor() { }
}

export class ClientStateModel {
  public pageClientDto: PageClientDto;
  public page: number;
  public size: number;
  public autocomplete: string[];
}



@State<ClientStateModel>({
  name: 'client',
  defaults: {
    pageClientDto: {},
    page: 0,
    size: 5,
    autocomplete: []
  }
})

export class ClientState {
  constructor(public clientService: ClientControllerRestService) { }

  @Action(ClietnPageAction)
  page(ctx: StateContext<ClientStateModel>, { page, size }: ClietnPageAction) {
    if (!page && !size) {
      page = ctx.getState().page;
      size = ctx.getState().size;

    }
    return this.clientService
      .getClientListUsingGET({ size, page }).pipe(tap(
        value => {
          ctx.patchState({
            pageClientDto: value,
            page,
            size
          });
        }
      ));
  }

  @Action(ClientDeleteAction)
  delete(ctx: StateContext<ClientStateModel>, { id }: ClientDeleteAction) {
    return this.clientService.deleteClientUsingDELETE(id).pipe(tap(
      value => {
        const page = ctx.getState().page;
        const size = ctx.getState().size;
        ctx.dispatch(new ClietnPageAction(page, size));
      }
    ));
  }

  @Action(ClientUpdateAction)
  upadate(ctx: StateContext<ClientStateModel>, clientDto: ClientUpdateAction) {
    return this.clientService.saveClientUsingPOST(clientDto.clientDto).pipe(
      tap(
        client => {
          const page = ctx.getState().page;
          const size = ctx.getState().size;
          ctx.dispatch(new ClietnPageAction(page, size));
        })
    );
  }

  @Action(ClientSearchAction)
  search(ctx: StateContext<ClientStateModel>, { searchText }: ClientSearchAction) {
    return this.clientService.searchClientsUsingGET({ searchText, page: 0, size: ctx.getState().size }).pipe(
      tap(
        client => {
          ctx.patchState({
            pageClientDto: client
          });
        }
      )
    );
  }

  @Action(AutocompleteAction)
  autocomplete(ctx: StateContext<ClientStateModel>, { autocomplete }: AutocompleteAction) {
    return this.clientService.autocompleteUsingGET(autocomplete).pipe(
      tap(
        value => {
          ctx.patchState({
            autocomplete: value
          });
        }
      )
    );
  }
  @Action(BackToDefoultClientAction)
  backToDefoultClient(ctx: StateContext<ClientStateModel>, BackToDefoultClientAction) {
    ctx.patchState({
      pageClientDto: {},
      page: 0,
      size: 5,
      autocomplete: []
    });
  }
}
