/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageCarServiceDto } from '../models/page-car-service-dto';
import { CarServiceDto } from '../models/car-service-dto';

/**
 * Car Service Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class CarServiceControllerRestService extends __BaseService {
  static readonly getCarServiceListUsingGETPath = '/api/car-services';
  static readonly saveCarServiceUsingPOSTPath = '/api/car-services';
  static readonly updateCarServiceUsingPUTPath = '/api/car-services';
  static readonly autocompleteCarServiceUsingGETPath = '/api/car-services/auto-complete';
  static readonly getCarServiceByIdUsingGETPath = '/api/car-services/{id}';
  static readonly deleteCarServiceUsingDELETEPath = '/api/car-services/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CarServiceControllerRestService.GetCarServiceListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getCarServiceListUsingGETResponse(params: CarServiceControllerRestService.GetCarServiceListUsingGETParams): __Observable<__StrictHttpResponse<PageCarServiceDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/car-services`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageCarServiceDto>;
      })
    );
  }
  /**
   * @param params The `CarServiceControllerRestService.GetCarServiceListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getCarServiceListUsingGET(params: CarServiceControllerRestService.GetCarServiceListUsingGETParams): __Observable<PageCarServiceDto> {
    return this.getCarServiceListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageCarServiceDto)
    );
  }

  /**
   * @param carServiceDto carServiceDto
   * @return OK
   */
  saveCarServiceUsingPOSTResponse(carServiceDto: CarServiceDto): __Observable<__StrictHttpResponse<CarServiceDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = carServiceDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/car-services`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CarServiceDto>;
      })
    );
  }
  /**
   * @param carServiceDto carServiceDto
   * @return OK
   */
  saveCarServiceUsingPOST(carServiceDto: CarServiceDto): __Observable<CarServiceDto> {
    return this.saveCarServiceUsingPOSTResponse(carServiceDto).pipe(
      __map(_r => _r.body as CarServiceDto)
    );
  }

  /**
   * @param carServiceDto carServiceDto
   * @return OK
   */
  updateCarServiceUsingPUTResponse(carServiceDto: CarServiceDto): __Observable<__StrictHttpResponse<CarServiceDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = carServiceDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/car-services`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CarServiceDto>;
      })
    );
  }
  /**
   * @param carServiceDto carServiceDto
   * @return OK
   */
  updateCarServiceUsingPUT(carServiceDto: CarServiceDto): __Observable<CarServiceDto> {
    return this.updateCarServiceUsingPUTResponse(carServiceDto).pipe(
      __map(_r => _r.body as CarServiceDto)
    );
  }

  /**
   * @param text text
   * @return OK
   */
  autocompleteCarServiceUsingGETResponse(text: string): __Observable<__StrictHttpResponse<Array<CarServiceDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (text != null) __params = __params.set('text', text.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/car-services/auto-complete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CarServiceDto>>;
      })
    );
  }
  /**
   * @param text text
   * @return OK
   */
  autocompleteCarServiceUsingGET(text: string): __Observable<Array<CarServiceDto>> {
    return this.autocompleteCarServiceUsingGETResponse(text).pipe(
      __map(_r => _r.body as Array<CarServiceDto>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getCarServiceByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<CarServiceDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/car-services/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CarServiceDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getCarServiceByIdUsingGET(id: number): __Observable<CarServiceDto> {
    return this.getCarServiceByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as CarServiceDto)
    );
  }

  /**
   * @param id id
   */
  deleteCarServiceUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/car-services/${id}`,
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
  deleteCarServiceUsingDELETE(id: number): __Observable<null> {
    return this.deleteCarServiceUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CarServiceControllerRestService {

  /**
   * Parameters for getCarServiceListUsingGET
   */
  export interface GetCarServiceListUsingGETParams {

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

export { CarServiceControllerRestService }
