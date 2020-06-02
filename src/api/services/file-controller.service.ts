/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * File Controller
 */
@Injectable({
  providedIn: 'root',
})
class FileControllerService extends __BaseService {
  static readonly uploadFotoCarUsingPOSTPath = '/api/file';
  static readonly getGeneratedVehicleHistoryReportUsingGETPath = '/api/file/{numberPlate}/{fileType}';
  static readonly getPDFUsingGETPath = '/api/file/{vehicleId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `FileControllerService.UploadFotoCarUsingPOSTParams` containing the following parameters:
   *
   * - `vehicleId`: vehicleId
   *
   * - `multipartFile`: multipartFile
   */
  uploadFotoCarUsingPOSTResponse(params: FileControllerService.UploadFotoCarUsingPOSTParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (params.vehicleId != null) __params = __params.set('vehicleId', params.vehicleId.toString());
    (params.multipartFile || []).forEach(val => {if (val != null) __formData.append('multipartFile', val as string | Blob)});
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/file`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `FileControllerService.UploadFotoCarUsingPOSTParams` containing the following parameters:
   *
   * - `vehicleId`: vehicleId
   *
   * - `multipartFile`: multipartFile
   */
  uploadFotoCarUsingPOST(params: FileControllerService.UploadFotoCarUsingPOSTParams): __Observable<null> {
    return this.uploadFotoCarUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `FileControllerService.GetGeneratedVehicleHistoryReportUsingGETParams` containing the following parameters:
   *
   * - `numberPlate`: numberPlate
   *
   * - `fileType`: fileType
   *
   * @return OK
   */
  getGeneratedVehicleHistoryReportUsingGETResponse(params: FileControllerService.GetGeneratedVehicleHistoryReportUsingGETParams): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/file/${params.numberPlate}/${params.fileType}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param params The `FileControllerService.GetGeneratedVehicleHistoryReportUsingGETParams` containing the following parameters:
   *
   * - `numberPlate`: numberPlate
   *
   * - `fileType`: fileType
   *
   * @return OK
   */
  getGeneratedVehicleHistoryReportUsingGET(params: FileControllerService.GetGeneratedVehicleHistoryReportUsingGETParams): __Observable<string> {
    return this.getGeneratedVehicleHistoryReportUsingGETResponse(params).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param vehicleId vehicleId
   * @return OK
   */
  getPDFUsingGETResponse(vehicleId: number): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/file/${vehicleId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param vehicleId vehicleId
   * @return OK
   */
  getPDFUsingGET(vehicleId: number): __Observable<string> {
    return this.getPDFUsingGETResponse(vehicleId).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module FileControllerService {

  /**
   * Parameters for uploadFotoCarUsingPOST
   */
  export interface UploadFotoCarUsingPOSTParams {

    /**
     * vehicleId
     */
    vehicleId: number;

    /**
     * multipartFile
     */
    multipartFile: Array<Blob>;
  }

  /**
   * Parameters for getGeneratedVehicleHistoryReportUsingGET
   */
  export interface GetGeneratedVehicleHistoryReportUsingGETParams {

    /**
     * numberPlate
     */
    numberPlate: string;

    /**
     * fileType
     */
    fileType: 'JSON' | 'CSV' | 'PDF' | 'XLS' | 'DOC';
  }
}

export { FileControllerService }
