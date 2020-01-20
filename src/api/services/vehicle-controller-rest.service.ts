/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageVehicleDto } from '../models/page-vehicle-dto';
import { VehicleDto } from '../models/vehicle-dto';

/**
 * Vehicle Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class VehicleControllerRestService extends __BaseService {
  static readonly getVehicleListUsingGETPath = '/api/vehicles';
  static readonly updateVehicleUsingPUTPath = '/api/vehicles';
  static readonly autocompleteVehicleUsingGETPath = '/api/vehicles/autoComplete';
  static readonly getPhotosPathsUsingGETPath = '/api/vehicles/photo/{id}';
  static readonly saveVehicleUsingPOSTPath = '/api/vehicles/{clientId}';
  static readonly getVehicleByIdUsingGETPath = '/api/vehicles/{id}';
  static readonly deleteVehicleUsingDELETEPath = '/api/vehicles/{id}';
  static readonly toggleNotificationUsingPATCHPath = '/api/vehicles/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `VehicleControllerRestService.GetVehicleListUsingGETParams` containing the following parameters:
   *
   * - `unpaged`:
   *
   * - `sort.unsorted`:
   *
   * - `sort.sorted`:
   *
   * - `paged`:
   *
   * - `pageSize`:
   *
   * - `pageNumber`:
   *
   * - `offset`:
   *
   * @return OK
   */
  getVehicleListUsingGETResponse(params: VehicleControllerRestService.GetVehicleListUsingGETParams): __Observable<__StrictHttpResponse<PageVehicleDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.unpaged != null) __params = __params.set('unpaged', params.unpaged.toString());
    if (params.sortUnsorted != null) __params = __params.set('sort.unsorted', params.sortUnsorted.toString());
    if (params.sortSorted != null) __params = __params.set('sort.sorted', params.sortSorted.toString());
    if (params.paged != null) __params = __params.set('paged', params.paged.toString());
    if (params.pageSize != null) __params = __params.set('pageSize', params.pageSize.toString());
    if (params.pageNumber != null) __params = __params.set('pageNumber', params.pageNumber.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/vehicles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageVehicleDto>;
      })
    );
  }
  /**
   * @param params The `VehicleControllerRestService.GetVehicleListUsingGETParams` containing the following parameters:
   *
   * - `unpaged`:
   *
   * - `sort.unsorted`:
   *
   * - `sort.sorted`:
   *
   * - `paged`:
   *
   * - `pageSize`:
   *
   * - `pageNumber`:
   *
   * - `offset`:
   *
   * @return OK
   */
  getVehicleListUsingGET(params: VehicleControllerRestService.GetVehicleListUsingGETParams): __Observable<PageVehicleDto> {
    return this.getVehicleListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageVehicleDto)
    );
  }

  /**
   * @param vehicleDto vehicleDto
   * @return OK
   */
  updateVehicleUsingPUTResponse(vehicleDto: VehicleDto): __Observable<__StrictHttpResponse<VehicleDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = vehicleDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/vehicles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VehicleDto>;
      })
    );
  }
  /**
   * @param vehicleDto vehicleDto
   * @return OK
   */
  updateVehicleUsingPUT(vehicleDto: VehicleDto): __Observable<VehicleDto> {
    return this.updateVehicleUsingPUTResponse(vehicleDto).pipe(
      __map(_r => _r.body as VehicleDto)
    );
  }

  /**
   * @param text text
   * @return OK
   */
  autocompleteVehicleUsingGETResponse(text: string): __Observable<__StrictHttpResponse<Array<VehicleDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (text != null) __params = __params.set('text', text.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/vehicles/autoComplete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VehicleDto>>;
      })
    );
  }
  /**
   * @param text text
   * @return OK
   */
  autocompleteVehicleUsingGET(text: string): __Observable<Array<VehicleDto>> {
    return this.autocompleteVehicleUsingGETResponse(text).pipe(
      __map(_r => _r.body as Array<VehicleDto>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getPhotosPathsUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Array<Array<number>>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/vehicles/photo/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Array<number>>>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getPhotosPathsUsingGET(id: number): __Observable<Array<Array<number>>> {
    return this.getPhotosPathsUsingGETResponse(id).pipe(
      __map(_r => _r.body as Array<Array<number>>)
    );
  }

  /**
   * @param params The `VehicleControllerRestService.SaveVehicleUsingPOSTParams` containing the following parameters:
   *
   * - `vehicleDto`: vehicleDto
   *
   * - `clientId`: clientId
   *
   * @return OK
   */
  saveVehicleUsingPOSTResponse(params: VehicleControllerRestService.SaveVehicleUsingPOSTParams): __Observable<__StrictHttpResponse<VehicleDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.vehicleDto;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/vehicles/${params.clientId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VehicleDto>;
      })
    );
  }
  /**
   * @param params The `VehicleControllerRestService.SaveVehicleUsingPOSTParams` containing the following parameters:
   *
   * - `vehicleDto`: vehicleDto
   *
   * - `clientId`: clientId
   *
   * @return OK
   */
  saveVehicleUsingPOST(params: VehicleControllerRestService.SaveVehicleUsingPOSTParams): __Observable<VehicleDto> {
    return this.saveVehicleUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as VehicleDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getVehicleByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<VehicleDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/vehicles/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VehicleDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getVehicleByIdUsingGET(id: number): __Observable<VehicleDto> {
    return this.getVehicleByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as VehicleDto)
    );
  }

  /**
   * @param id id
   */
  deleteVehicleUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/vehicles/${id}`,
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
   * @param id id
   */
  deleteVehicleUsingDELETE(id: number): __Observable<null> {
    return this.deleteVehicleUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id id
   */
  toggleNotificationUsingPATCHResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/api/vehicles/${id}`,
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
   * @param id id
   */
  toggleNotificationUsingPATCH(id: number): __Observable<null> {
    return this.toggleNotificationUsingPATCHResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module VehicleControllerRestService {

  /**
   * Parameters for getVehicleListUsingGET
   */
  export interface GetVehicleListUsingGETParams {
    unpaged?: boolean;
    sortUnsorted?: boolean;
    sortSorted?: boolean;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
    offset?: number;
  }

  /**
   * Parameters for saveVehicleUsingPOST
   */
  export interface SaveVehicleUsingPOSTParams {

    /**
     * vehicleDto
     */
    vehicleDto: VehicleDto;

    /**
     * clientId
     */
    clientId: number;
  }
}

export { VehicleControllerRestService }
