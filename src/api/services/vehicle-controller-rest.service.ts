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
  static readonly getListUsingGET3Path = '/api/vehicles';
  static readonly updateUsingPUT2Path = '/api/vehicles';
  static readonly saveUsingPOST2Path = '/api/vehicles/{clientId}';
  static readonly getByIdUsingGET3Path = '/api/vehicles/{id}';
  static readonly deleteUsingDELETE2Path = '/api/vehicles/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `VehicleControllerRestService.GetListUsingGET3Params` containing the following parameters:
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
  getListUsingGET3Response(params: VehicleControllerRestService.GetListUsingGET3Params): __Observable<__StrictHttpResponse<PageVehicleDto>> {
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
   * @param params The `VehicleControllerRestService.GetListUsingGET3Params` containing the following parameters:
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
  getListUsingGET3(params: VehicleControllerRestService.GetListUsingGET3Params): __Observable<PageVehicleDto> {
    return this.getListUsingGET3Response(params).pipe(
      __map(_r => _r.body as PageVehicleDto)
    );
  }

  /**
   * @param vehicleDto vehicleDto
   * @return OK
   */
  updateUsingPUT2Response(vehicleDto: VehicleDto): __Observable<__StrictHttpResponse<VehicleDto>> {
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
  updateUsingPUT2(vehicleDto: VehicleDto): __Observable<VehicleDto> {
    return this.updateUsingPUT2Response(vehicleDto).pipe(
      __map(_r => _r.body as VehicleDto)
    );
  }

  /**
   * @param params The `VehicleControllerRestService.SaveUsingPOST2Params` containing the following parameters:
   *
   * - `vehicleDto`: vehicleDto
   *
   * - `clientId`: clientId
   *
   * @return OK
   */
  saveUsingPOST2Response(params: VehicleControllerRestService.SaveUsingPOST2Params): __Observable<__StrictHttpResponse<VehicleDto>> {
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
   * @param params The `VehicleControllerRestService.SaveUsingPOST2Params` containing the following parameters:
   *
   * - `vehicleDto`: vehicleDto
   *
   * - `clientId`: clientId
   *
   * @return OK
   */
  saveUsingPOST2(params: VehicleControllerRestService.SaveUsingPOST2Params): __Observable<VehicleDto> {
    return this.saveUsingPOST2Response(params).pipe(
      __map(_r => _r.body as VehicleDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getByIdUsingGET3Response(id: number): __Observable<__StrictHttpResponse<VehicleDto>> {
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
  getByIdUsingGET3(id: number): __Observable<VehicleDto> {
    return this.getByIdUsingGET3Response(id).pipe(
      __map(_r => _r.body as VehicleDto)
    );
  }

  /**
   * @param id id
   */
  deleteUsingDELETE2Response(id?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
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
  deleteUsingDELETE2(id?: number): __Observable<null> {
    return this.deleteUsingDELETE2Response(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module VehicleControllerRestService {

  /**
   * Parameters for getListUsingGET3
   */
  export interface GetListUsingGET3Params {
    unpaged?: boolean;
    sortUnsorted?: boolean;
    sortSorted?: boolean;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
    offset?: number;
  }

  /**
   * Parameters for saveUsingPOST2
   */
  export interface SaveUsingPOST2Params {

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
