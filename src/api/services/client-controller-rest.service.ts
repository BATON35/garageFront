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
  static readonly saveClientUsingPOSTPath = '/api/clients';
  static readonly updateClientUsingPUTPath = '/api/clients';
  static readonly autocompleteUsingGETPath = '/api/clients/autoComplete';
  static readonly searchClientsUsingGETPath = '/api/clients/search';
  static readonly getClientByIdUsingGETPath = '/api/clients/{id}';
  static readonly deleteClientUsingDELETEPath = '/api/clients/{id}';
  static readonly getClientListUsingGETPath = '/api/clients/{page}/{size}';

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
  saveClientUsingPOSTResponse(clientDto: ClientDto): __Observable<__StrictHttpResponse<ClientDto>> {
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
  saveClientUsingPOST(clientDto: ClientDto): __Observable<ClientDto> {
    return this.saveClientUsingPOSTResponse(clientDto).pipe(
      __map(_r => _r.body as ClientDto)
    );
  }

  /**
   * @param clientDto clientDto
   * @return OK
   */
  updateClientUsingPUTResponse(clientDto: ClientDto): __Observable<__StrictHttpResponse<ClientDto>> {
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
  updateClientUsingPUT(clientDto: ClientDto): __Observable<ClientDto> {
    return this.updateClientUsingPUTResponse(clientDto).pipe(
      __map(_r => _r.body as ClientDto)
    );
  }

  /**
   * @param text text
   * @return OK
   */
  autocompleteUsingGETResponse(text: string): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (text != null) __params = __params.set('text', text.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/clients/autoComplete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<string>>;
      })
    );
  }
  /**
   * @param text text
   * @return OK
   */
  autocompleteUsingGET(text: string): __Observable<Array<string>> {
    return this.autocompleteUsingGETResponse(text).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }

  /**
   * @param params The `ClientControllerRestService.SearchClientsUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `searchText`: searchText
   *
   * - `page`: page
   *
   * @return OK
   */
  searchClientsUsingGETResponse(params: ClientControllerRestService.SearchClientsUsingGETParams): __Observable<__StrictHttpResponse<PageClientDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.searchText != null) __params = __params.set('searchText', params.searchText.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/clients/search`,
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
   * @param params The `ClientControllerRestService.SearchClientsUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `searchText`: searchText
   *
   * - `page`: page
   *
   * @return OK
   */
  searchClientsUsingGET(params: ClientControllerRestService.SearchClientsUsingGETParams): __Observable<PageClientDto> {
    return this.searchClientsUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageClientDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getClientByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ClientDto>> {
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
  getClientByIdUsingGET(id: number): __Observable<ClientDto> {
    return this.getClientByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as ClientDto)
    );
  }

  /**
   * @param id id
   */
  deleteClientUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
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
  deleteClientUsingDELETE(id: number): __Observable<null> {
    return this.deleteClientUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ClientControllerRestService.GetClientListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * - `deleted`: deleted
   *
   * @return OK
   */
  getClientListUsingGETResponse(params: ClientControllerRestService.GetClientListUsingGETParams): __Observable<__StrictHttpResponse<PageClientDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.deleted != null) __params = __params.set('deleted', params.deleted.toString());
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
   * @param params The `ClientControllerRestService.GetClientListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * - `deleted`: deleted
   *
   * @return OK
   */
  getClientListUsingGET(params: ClientControllerRestService.GetClientListUsingGETParams): __Observable<PageClientDto> {
    return this.getClientListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageClientDto)
    );
  }
}

module ClientControllerRestService {

  /**
   * Parameters for searchClientsUsingGET
   */
  export interface SearchClientsUsingGETParams {

    /**
     * size
     */
    size: number;

    /**
     * searchText
     */
    searchText: string;

    /**
     * page
     */
    page: number;
  }

  /**
   * Parameters for getClientListUsingGET
   */
  export interface GetClientListUsingGETParams {

    /**
     * size
     */
    size: number;

    /**
     * page
     */
    page: number;

    /**
     * deleted
     */
    deleted: boolean;
  }
}

export { ClientControllerRestService }
