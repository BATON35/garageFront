import { tap } from 'rxjs/operators';
import { PartControllerRestService } from 'src/api/services';
import { State, Action, StateContext } from '@ngxs/store';
import { PagePartDto, PartDto } from 'src/api/models';

export class PartUpdateAction {
  static readonly type = '[Part] PartUpdateAction';
  constructor(public partDto: PartDto) { }
}

export class AutocompleteNamePartAction {
  static readonly type = '[Part] AutocompleteNamePartAction';
  constructor(public text: string) { }
}
export class LoadPartPageAction {
  static readonly type = '[Part] LoadPartPageAction';
  constructor(public page: number, public size: number) { }
}
export class PartStateModel {
  public pagePart: PagePartDto;
  public partsAutocomplete: PartDto[];
}

@State<PartStateModel>({
  name: 'part',
  defaults: {
    pagePart: {},
    partsAutocomplete: []
  }
})
export class PartState {
  constructor(public partController: PartControllerRestService) { }
  @Action(LoadPartPageAction)
  loadPartPageAction(ctx: StateContext<PartStateModel>, { page, size }: LoadPartPageAction) {
    return this.partController.getPartPageUsingGET({ page, size }).pipe(
      tap(part => ctx.patchState({
        pagePart: part
      })

      )
    );
  }
  @Action(AutocompleteNamePartAction)
  autocompleteNamePart(ctx: StateContext<PartStateModel>, { text }: AutocompleteNamePartAction) {
    if (text && text.length > 1) {
      return this.partController.autocompletePartUsingGET(text).pipe(
        tap(part => ctx.patchState({
          partsAutocomplete: part
        }))
      );
    }
  }
  @Action(PartUpdateAction)
  partUpdate(ctx: StateContext<PartStateModel>, partDto: PartUpdateAction) {
    return this.partController.savePartUsingPOST(partDto.partDto).pipe(
      tap(
        part => {
          ctx.dispatch(new LoadPartPageAction(0, 5));
        }
      )
    );
  }
}
