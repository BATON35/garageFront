import { State, Action, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class UploadVehiclePhotoAction {
  static readonly type = '${name} uload vehicle photo';
  constructor(public file: File, public vehicleId: number) { }
}

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
    return this.httpClient.get(`http://localhost:8080/api/file/${id}`, {
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
  @Action(UploadVehiclePhotoAction)
  uploadVehiclePhoto(ctx: StateContext<FileStateModel>, { file, vehicleId }: UploadVehiclePhotoAction) {
    const formData = new FormData();
    console.log(file)
    formData.append('multipartFile', file, file.name);
    console.log('UploadVehiclePhoto')
    return this.httpClient.post(`http://localhost:8080/api/file?vehicleId=${vehicleId}`, formData, {});
  }
}
