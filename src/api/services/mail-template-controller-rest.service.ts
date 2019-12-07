/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Template } from '../models/template';
import { PageTemplate } from '../models/page-template';

/**
 * Mail Template Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class MailTemplateControllerRestService extends __BaseService {
  static readonly saveMailTemplateUsingPOSTPath = '/api/mail-template';
  static readonly updateMailTemplateUsingPUTPath = '/api/mail-template';
  static readonly deleteMailTemplateUsingDELETEPath = '/api/mail-template/{id}';
  static readonly getListUsingGETPath = '/api/mail-template/{page}/[size}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param template template
   * @return OK
   */
  saveMailTemplateUsingPOSTResponse(template: Template): __Observable<__StrictHttpResponse<Template>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = template;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/mail-template`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Template>;
      })
    );
  }
  /**
   * @param template template
   * @return OK
   */
  saveMailTemplateUsingPOST(template: Template): __Observable<Template> {
    return this.saveMailTemplateUsingPOSTResponse(template).pipe(
      __map(_r => _r.body as Template)
    );
  }

  /**
   * @param template template
   * @return OK
   */
  updateMailTemplateUsingPUTResponse(template: Template): __Observable<__StrictHttpResponse<Template>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = template;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/mail-template`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Template>;
      })
    );
  }
  /**
   * @param template template
   * @return OK
   */
  updateMailTemplateUsingPUT(template: Template): __Observable<Template> {
    return this.updateMailTemplateUsingPUTResponse(template).pipe(
      __map(_r => _r.body as Template)
    );
  }

  /**
   * @param id id
   */
  deleteMailTemplateUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/mail-template/${id}`,
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
  deleteMailTemplateUsingDELETE(id: number): __Observable<null> {
    return this.deleteMailTemplateUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MailTemplateControllerRestService.GetListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGETResponse(params: MailTemplateControllerRestService.GetListUsingGETParams): __Observable<__StrictHttpResponse<PageTemplate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/mail-template/${params.page}/[size}`,
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
   * @param params The `MailTemplateControllerRestService.GetListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGET(params: MailTemplateControllerRestService.GetListUsingGETParams): __Observable<PageTemplate> {
    return this.getListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageTemplate)
    );
  }
}

module MailTemplateControllerRestService {

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

export { MailTemplateControllerRestService }
