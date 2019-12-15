/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageJobDto } from '../models/page-job-dto';
import { JobDto } from '../models/job-dto';
import { ServicePartResponseDto } from '../models/service-part-response-dto';

/**
 * Job Controller
 */
@Injectable({
  providedIn: 'root',
})
class JobControllerService extends __BaseService {
  static readonly getServicePartListUsingGETPath = '/api/service-part';
  static readonly saveServicePartUsingPOSTPath = '/api/service-part';
  static readonly updateServicePartUsingPUTPath = '/api/service-part';
  static readonly getServicePartHistoryUsingGETPath = '/api/service-part/history';
  static readonly getServicePartByIdUsingGETPath = '/api/service-part/{id}';
  static readonly deleteServicePartUsingDELETEPath = '/api/service-part/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `JobControllerService.GetServicePartListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getServicePartListUsingGETResponse(params: JobControllerService.GetServicePartListUsingGETParams): __Observable<__StrictHttpResponse<PageJobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/service-part`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageJobDto>;
      })
    );
  }
  /**
   * @param params The `JobControllerService.GetServicePartListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getServicePartListUsingGET(params: JobControllerService.GetServicePartListUsingGETParams): __Observable<PageJobDto> {
    return this.getServicePartListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageJobDto)
    );
  }

  /**
   * @param jobDto jobDto
   * @return OK
   */
  saveServicePartUsingPOSTResponse(jobDto: JobDto): __Observable<__StrictHttpResponse<JobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = jobDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/service-part`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JobDto>;
      })
    );
  }
  /**
   * @param jobDto jobDto
   * @return OK
   */
  saveServicePartUsingPOST(jobDto: JobDto): __Observable<JobDto> {
    return this.saveServicePartUsingPOSTResponse(jobDto).pipe(
      __map(_r => _r.body as JobDto)
    );
  }

  /**
   * @param jobDto jobDto
   * @return OK
   */
  updateServicePartUsingPUTResponse(jobDto: JobDto): __Observable<__StrictHttpResponse<JobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = jobDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/service-part`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JobDto>;
      })
    );
  }
  /**
   * @param jobDto jobDto
   * @return OK
   */
  updateServicePartUsingPUT(jobDto: JobDto): __Observable<JobDto> {
    return this.updateServicePartUsingPUTResponse(jobDto).pipe(
      __map(_r => _r.body as JobDto)
    );
  }

  /**
   * @param vehicleId vehicleId
   * @return OK
   */
  getServicePartHistoryUsingGETResponse(vehicleId?: number): __Observable<__StrictHttpResponse<Array<ServicePartResponseDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (vehicleId != null) __params = __params.set('vehicleId', vehicleId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/service-part/history`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ServicePartResponseDto>>;
      })
    );
  }
  /**
   * @param vehicleId vehicleId
   * @return OK
   */
  getServicePartHistoryUsingGET(vehicleId?: number): __Observable<Array<ServicePartResponseDto>> {
    return this.getServicePartHistoryUsingGETResponse(vehicleId).pipe(
      __map(_r => _r.body as Array<ServicePartResponseDto>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getServicePartByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<JobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/service-part/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JobDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getServicePartByIdUsingGET(id: number): __Observable<JobDto> {
    return this.getServicePartByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as JobDto)
    );
  }

  /**
   * @param id id
   */
  deleteServicePartUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/service-part/${id}`,
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
  deleteServicePartUsingDELETE(id: number): __Observable<null> {
    return this.deleteServicePartUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module JobControllerService {

  /**
   * Parameters for getServicePartListUsingGET
   */
  export interface GetServicePartListUsingGETParams {

    /**
     * size
     */
    size: number;

    /**
     * page
     */
    page: number;
  }
}

export { JobControllerService }
