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
  static readonly saveUserUsingPOSTPath = '/api/users';
  static readonly updateUserUsingPUTPath = '/api/users';
  static readonly changePasswordUsingPOSTPath = '/api/users/change-password';
  static readonly userInfoUsingGETPath = '/api/users/info';
  static readonly searchUsersUsingGETPath = '/api/users/search';
  static readonly getUserByIdUsingGETPath = '/api/users/{id}';
  static readonly deleteUserUsingDELETEPath = '/api/users/{id}';

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
  saveUserUsingPOSTResponse(userDto: UserDto): __Observable<__StrictHttpResponse<UserDto>> {
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
  saveUserUsingPOST(userDto: UserDto): __Observable<UserDto> {
    return this.saveUserUsingPOSTResponse(userDto).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param userDto userDto
   * @return OK
   */
  updateUserUsingPUTResponse(userDto: UserDto): __Observable<__StrictHttpResponse<UserDto>> {
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
  updateUserUsingPUT(userDto: UserDto): __Observable<UserDto> {
    return this.updateUserUsingPUTResponse(userDto).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param userDto userDto
   */
  changePasswordUsingPOSTResponse(userDto: UserDto): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = userDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/users/change-password`,
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
   * @param userDto userDto
   */
  changePasswordUsingPOST(userDto: UserDto): __Observable<null> {
    return this.changePasswordUsingPOSTResponse(userDto).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @return OK
   */
  userInfoUsingGETResponse(): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/users/info`,
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
   * @return OK
   */
  userInfoUsingGET(): __Observable<UserDto> {
    return this.userInfoUsingGETResponse().pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param params The `UserControllerRestService.SearchUsersUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `searchText`: searchText
   *
   * - `page`: page
   *
   * - `roles`: roles
   *
   * @return OK
   */
  searchUsersUsingGETResponse(params: UserControllerRestService.SearchUsersUsingGETParams): __Observable<__StrictHttpResponse<PageUserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.searchText != null) __params = __params.set('searchText', params.searchText.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    (params.roles || []).forEach(val => {if (val != null) __params = __params.append('roles', val.toString())});
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/users/search`,
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
   * @param params The `UserControllerRestService.SearchUsersUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `searchText`: searchText
   *
   * - `page`: page
   *
   * - `roles`: roles
   *
   * @return OK
   */
  searchUsersUsingGET(params: UserControllerRestService.SearchUsersUsingGETParams): __Observable<PageUserDto> {
    return this.searchUsersUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageUserDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getUserByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<UserDto>> {
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
  getUserByIdUsingGET(id: number): __Observable<UserDto> {
    return this.getUserByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param id id
   */
  deleteUserUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
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
  deleteUserUsingDELETE(id: number): __Observable<null> {
    return this.deleteUserUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UserControllerRestService {

  /**
   * Parameters for searchUsersUsingGET
   */
  export interface SearchUsersUsingGETParams {

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

    /**
     * roles
     */
    roles?: Array<string>;
  }
}

export { UserControllerRestService }
