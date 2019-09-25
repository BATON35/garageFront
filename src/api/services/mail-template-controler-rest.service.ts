/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageTemplate } from '../models/page-template';

/**
 * Mail Template Controler Rest
 */
@Injectable({
  providedIn: 'root',
})
class MailTemplateControlerRestService extends __BaseService {
  static readonly deleteUsingDELETE1Path = '/{id}';
  static readonly getListUsingGET1Path = '/{page}/[size}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id id
   */
  deleteUsingDELETE1Response(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/${id}`,
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
  deleteUsingDELETE1(id: number): __Observable<null> {
    return this.deleteUsingDELETE1Response(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MailTemplateControlerRestService.GetListUsingGET1Params` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGET1Response(params: MailTemplateControlerRestService.GetListUsingGET1Params): __Observable<__StrictHttpResponse<PageTemplate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/${params.page}/[size}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageTemplate>;
      })
    );
  }
  /**
   * @param params The `MailTemplateControlerRestService.GetListUsingGET1Params` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGET1(params: MailTemplateControlerRestService.GetListUsingGET1Params): __Observable<PageTemplate> {
    return this.getListUsingGET1Response(params).pipe(
      __map(_r => _r.body as PageTemplate)
    );
  }
}

module MailTemplateControlerRestService {

  /**
   * Parameters for getListUsingGET1
   */
  export interface GetListUsingGET1Params {

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

export { MailTemplateControlerRestService }
