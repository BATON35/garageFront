import { State, Action, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class DownloadVehicleHistoryAction {
  static readonly type = '[File] download vehicle history';
  constructor(public id: number) { }
}

export class FileStateModel {
}

@State<FileStateModel>({
  name: 'file',
  defaults: {
  }
})
export class FileState {
  constructor(public httpClient: HttpClient) { }
  @Action(DownloadVehicleHistoryAction)
  downloadVehicleHistory(ctx: StateContext<FileStateModel>, { id }: DownloadVehicleHistoryAction) {
    return this.httpClient.get(`http://localhost:8080/api/pdf/${id}`, {
      responseType: 'blob'
    }).pipe(tap(file => {
      let link = document.createElement("a");
      if (link.download !== undefined) {
        let url = URL.createObjectURL(file);
        link.setAttribute("href", url);
        link.setAttribute("download", 'ticket.pdf');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      else {
        //html5 download not supported
      }
    }))
  }
}
