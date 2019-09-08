/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserDto } from '../models/user-dto';
import { PageUserDto } from '../models/page-user-dto';

/**
 * User Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerRestService extends __BaseService {
  static readonly saveUsingPOST1Path = '/api/users';
  static readonly updateUsingPUT1Path = '/api/users';
  static readonly getByIdUsingGET2Path = '/api/users/{id}';
  static readonly deleteUsingDELETE1Path = '/api/users/{id}';
  static readonly getListUsingGET2Path = '/api/users/{page}/{size}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param userDto userDto
   * @return OK
   */
  saveUsingPOST1Response(userDto: UserDto): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = userDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDto>;
      })
    );
  }
  /**
   * @param userDto userDto
   * @return OK
   */
  saveUsingPOST1(userDto: UserDto): __Observable<UserDto> {
    return this.saveUsingPOST1Response(userDto).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param userDto userDto
   * @return OK
   */
  updateUsingPUT1Response(userDto: UserDto): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = userDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDto>;
      })
    );
  }
  /**
   * @param userDto userDto
   * @return OK
   */
  updateUsingPUT1(userDto: UserDto): __Observable<UserDto> {
    return this.updateUsingPUT1Response(userDto).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getByIdUsingGET2Response(id: number): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/users/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getByIdUsingGET2(id: number): __Observable<UserDto> {
    return this.getByIdUsingGET2Response(id).pipe(
      __map(_r => _r.body as UserDto)
    );
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
      this.rootUrl + `/api/users/${id}`,
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
   * @param params The `UserControllerRestService.GetListUsingGET2Params` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGET2Response(params: UserControllerRestService.GetListUsingGET2Params): __Observable<__StrictHttpResponse<PageUserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/users/${params.page}/${params.size}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageUserDto>;
      })
    );
  }
  /**
   * @param params The `UserControllerRestService.GetListUsingGET2Params` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getListUsingGET2(params: UserControllerRestService.GetListUsingGET2Params): __Observable<PageUserDto> {
    return this.getListUsingGET2Response(params).pipe(
      __map(_r => _r.body as PageUserDto)
    );
  }
}

module UserControllerRestService {

  /**
   * Parameters for getListUsingGET2
   */
  export interface GetListUsingGET2Params {

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

export { UserControllerRestService }
