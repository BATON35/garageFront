/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageClientDto } from '../models/page-client-dto';
import { ClientDto } from '../models/client-dto';

/**
 * Client Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class ClientControllerRestService extends __BaseService {
  static readonly getListUsingGETPath = '/api/clients';
  static readonly saveUsingPOSTPath = '/api/clients';
  static readonly updateUsingPUTPath = '/api/clients';
  static readonly getByIdUsingGETPath = '/api/clients/{id}';
  static readonly deleteUsingDELETEPath = '/api/clients/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ClientControllerRestService.GetListUsingGETParams` containing the following parameters:
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
  getListUsingGETResponse(params: ClientControllerRestService.GetListUsingGETParams): __Observable<__StrictHttpResponse<PageClientDto>> {
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
      this.rootUrl + `/api/clients`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageClientDto>;
      })
    );
  }
  /**
   * @param params The `ClientControllerRestService.GetListUsingGETParams` containing the following parameters:
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
  getListUsingGET(params: ClientControllerRestService.GetListUsingGETParams): __Observable<PageClientDto> {
    return this.getListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageClientDto)
    );
  }

  /**
   * @param clientDto clientDto
   * @return OK
   */
  saveUsingPOSTResponse(clientDto: ClientDto): __Observable<__StrictHttpResponse<ClientDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = clientDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/clients`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClientDto>;
      })
    );
  }
  /**
   * @param clientDto clientDto
   * @return OK
   */
  saveUsingPOST(clientDto: ClientDto): __Observable<ClientDto> {
    return this.saveUsingPOSTResponse(clientDto).pipe(
      __map(_r => _r.body as ClientDto)
    );
  }

  /**
   * @param clientDto clientDto
   * @return OK
   */
  updateUsingPUTResponse(clientDto: ClientDto): __Observable<__StrictHttpResponse<ClientDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = clientDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/clients`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClientDto>;
      })
    );
  }
  /**
   * @param clientDto clientDto
   * @return OK
   */
  updateUsingPUT(clientDto: ClientDto): __Observable<ClientDto> {
    return this.updateUsingPUTResponse(clientDto).pipe(
      __map(_r => _r.body as ClientDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ClientDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/clients/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClientDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getByIdUsingGET(id: number): __Observable<ClientDto> {
    return this.getByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ClientDto)
    );
  }

  /**
   * @param id id
   */
  deleteUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/clients/${id}`,
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
  deleteUsingDELETE(id: number): __Observable<null> {
    return this.deleteUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ClientControllerRestService {

  /**
   * Parameters for getListUsingGET
   */
  export interface GetListUsingGETParams {
    unpaged?: boolean;
    sortUnsorted?: boolean;
    sortSorted?: boolean;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
    offset?: number;
  }
}

export { ClientControllerRestService }
