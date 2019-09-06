/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RoleDto } from '../models/role-dto';

/**
 * Role Controller
 */
@Injectable({
  providedIn: 'root',
})
class RoleControllerService extends __BaseService {
  static readonly getListUsingGET1Path = '/api/roles';
  static readonly getByIdUsingGET1Path = '/api/roles/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getListUsingGET1Response(): __Observable<__StrictHttpResponse<Array<RoleDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/roles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<RoleDto>>;
      })
    );
  }
  /**
   * @return OK
   */
  getListUsingGET1(): __Observable<Array<RoleDto>> {
    return this.getListUsingGET1Response().pipe(
      __map(_r => _r.body as Array<RoleDto>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getByIdUsingGET1Response(id: number): __Observable<__StrictHttpResponse<RoleDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/roles/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RoleDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getByIdUsingGET1(id: number): __Observable<RoleDto> {
    return this.getByIdUsingGET1Response(id).pipe(
      __map(_r => _r.body as RoleDto)
    );
  }
}

module RoleControllerService {
}

export { RoleControllerService }
