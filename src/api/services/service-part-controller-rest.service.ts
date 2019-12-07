/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageServicePartDto } from '../models/page-service-part-dto';
import { ServicePartDto } from '../models/service-part-dto';

/**
 * Service Part Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class ServicePartControllerRestService extends __BaseService {
  static readonly getServicePartListUsingGETPath = '/api/service-part';
  static readonly saveServicePartUsingPOSTPath = '/api/service-part';
  static readonly updateServicePartUsingPUTPath = '/api/service-part';
  static readonly getServicePartByIdUsingGETPath = '/api/service-part/{id}';
  static readonly deleteServicePartUsingDELETEPath = '/api/service-part/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ServicePartControllerRestService.GetServicePartListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getServicePartListUsingGETResponse(params: ServicePartControllerRestService.GetServicePartListUsingGETParams): __Observable<__StrictHttpResponse<PageServicePartDto>> {
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
        return _r as __StrictHttpResponse<PageServicePartDto>;
      })
    );
  }
  /**
   * @param params The `ServicePartControllerRestService.GetServicePartListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getServicePartListUsingGET(params: ServicePartControllerRestService.GetServicePartListUsingGETParams): __Observable<PageServicePartDto> {
    return this.getServicePartListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageServicePartDto)
    );
  }

  /**
   * @param servicePartDto servicePartDto
   * @return OK
   */
  saveServicePartUsingPOSTResponse(servicePartDto: ServicePartDto): __Observable<__StrictHttpResponse<ServicePartDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = servicePartDto;
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
        return _r as __StrictHttpResponse<ServicePartDto>;
      })
    );
  }
  /**
   * @param servicePartDto servicePartDto
   * @return OK
   */
  saveServicePartUsingPOST(servicePartDto: ServicePartDto): __Observable<ServicePartDto> {
    return this.saveServicePartUsingPOSTResponse(servicePartDto).pipe(
      __map(_r => _r.body as ServicePartDto)
    );
  }

  /**
   * @param servicePartDto servicePartDto
   * @return OK
   */
  updateServicePartUsingPUTResponse(servicePartDto: ServicePartDto): __Observable<__StrictHttpResponse<ServicePartDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = servicePartDto;
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
        return _r as __StrictHttpResponse<ServicePartDto>;
      })
    );
  }
  /**
   * @param servicePartDto servicePartDto
   * @return OK
   */
  updateServicePartUsingPUT(servicePartDto: ServicePartDto): __Observable<ServicePartDto> {
    return this.updateServicePartUsingPUTResponse(servicePartDto).pipe(
      __map(_r => _r.body as ServicePartDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getServicePartByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ServicePartDto>> {
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
        return _r as __StrictHttpResponse<ServicePartDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getServicePartByIdUsingGET(id: number): __Observable<ServicePartDto> {
    return this.getServicePartByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ServicePartDto)
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

module ServicePartControllerRestService {

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

export { ServicePartControllerRestService }
