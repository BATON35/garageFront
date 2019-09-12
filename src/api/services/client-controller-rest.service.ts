/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ClientDto } from '../models/client-dto';
import { PageClientDto } from '../models/page-client-dto';

/**
 * Client Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class ClientControllerRestService extends __BaseService {
  static readonly saveUsingPOSTPath = '/api/clients';
  static readonly updateUsingPUTPath = '/api/clients';
  static readonly getByIdUsingGETPath = '/api/clients/{id}';
  static readonly deleteUsingDELETEPath = '/api/clients/{id}';
  static readonly getListUsingGETPath = '/api/clients/{page}/{size}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
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

  /**
   * @param params The `ClientControllerRestService.GetListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGETResponse(params: ClientControllerRestService.GetListUsingGETParams): __Observable<__StrictHttpResponse<PageClientDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/clients/${params.page}/${params.size}`,
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
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGET(params: ClientControllerRestService.GetListUsingGETParams): __Observable<PageClientDto> {
    return this.getListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageClientDto)
    );
  }
}

module ClientControllerRestService {

  /**
   * Parameters for getListUsingGET
   */
  export interface GetListUsingGETParams {

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

export { ClientControllerRestService }
