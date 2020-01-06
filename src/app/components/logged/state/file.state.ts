import { element } from 'protractor';
import { State, Action, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class UploadVehiclePhotoAction {
  static readonly type = '[file] UploadVehiclePhotoAction';
  constructor(public file: File[], public vehicleId: number) { }
}

export class DownloadVehicleHistoryAction {
  static readonly type = '[File] UploadVehiclePhotoAction';
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
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(file);
        link.setAttribute('href', url);
        link.setAttribute('download', 'ticket.pdf');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // html5 download not supported
      }
    }));
  }
  @Action(UploadVehiclePhotoAction)
  uploadVehiclePhoto(ctx: StateContext<FileStateModel>, { file, vehicleId }: UploadVehiclePhotoAction) {
    const formData = new FormData();
    console.log(file);
    file.forEach((element) => formData.append('multipartFile', element, element.name));
    console.log('UploadVehiclePhoto');
    return this.httpClient.post(`http://localhost:8080/api/file?vehicleId=${vehicleId}`, formData, {});
  }
}
