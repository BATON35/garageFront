/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PagePartDto } from '../models/page-part-dto';
import { PartDto } from '../models/part-dto';

/**
 * Part Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class PartControllerRestService extends __BaseService {
  static readonly getPartPageUsingGETPath = '/parts';
  static readonly savePartUsingPOSTPath = '/parts';
  static readonly updatePartUsingPUTPath = '/parts';
  static readonly autocompletePartUsingGETPath = '/parts/auto-complete';
  static readonly getPartByIdUsingGETPath = '/parts/{id}';
  static readonly deletePartUsingDELETEPath = '/parts/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `PartControllerRestService.GetPartPageUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getPartPageUsingGETResponse(params: PartControllerRestService.GetPartPageUsingGETParams): __Observable<__StrictHttpResponse<PagePartDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/parts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PagePartDto>;
      })
    );
  }
  /**
   * @param params The `PartControllerRestService.GetPartPageUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getPartPageUsingGET(params: PartControllerRestService.GetPartPageUsingGETParams): __Observable<PagePartDto> {
    return this.getPartPageUsingGETResponse(params).pipe(
      __map(_r => _r.body as PagePartDto)
    );
  }

  /**
   * @param partDto partDto
   * @return OK
   */
  savePartUsingPOSTResponse(partDto: PartDto): __Observable<__StrictHttpResponse<PartDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = partDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/parts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PartDto>;
      })
    );
  }
  /**
   * @param partDto partDto
   * @return OK
   */
  savePartUsingPOST(partDto: PartDto): __Observable<PartDto> {
    return this.savePartUsingPOSTResponse(partDto).pipe(
      __map(_r => _r.body as PartDto)
    );
  }

  /**
   * @param partDto partDto
   * @return OK
   */
  updatePartUsingPUTResponse(partDto: PartDto): __Observable<__StrictHttpResponse<PartDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = partDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/parts`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PartDto>;
      })
    );
  }
  /**
   * @param partDto partDto
   * @return OK
   */
  updatePartUsingPUT(partDto: PartDto): __Observable<PartDto> {
    return this.updatePartUsingPUTResponse(partDto).pipe(
      __map(_r => _r.body as PartDto)
    );
  }

  /**
   * @param text text
   * @return OK
   */
  autocompletePartUsingGETResponse(text: string): __Observable<__StrictHttpResponse<Array<PartDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (text != null) __params = __params.set('text', text.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/parts/auto-complete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PartDto>>;
      })
    );
  }
  /**
   * @param text text
   * @return OK
   */
  autocompletePartUsingGET(text: string): __Observable<Array<PartDto>> {
    return this.autocompletePartUsingGETResponse(text).pipe(
      __map(_r => _r.body as Array<PartDto>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getPartByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<PartDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/parts/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PartDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getPartByIdUsingGET(id: number): __Observable<PartDto> {
    return this.getPartByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as PartDto)
    );
  }

  /**
   * @param id id
   */
  deletePartUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/parts/${id}`,
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
  deletePartUsingDELETE(id: number): __Observable<null> {
    return this.deletePartUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PartControllerRestService {

  /**
   * Parameters for getPartPageUsingGET
   */
  export interface GetPartPageUsingGETParams {

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

export { PartControllerRestService }
