/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Car Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class CarControllerRestService extends __BaseService {
  static readonly getBrandUsingGETPath = '/api/car/brand';
  static readonly getModelUsingGETPath = '/api/car/model';
  static readonly getProductionDateUsingGETPath = '/api/car/production';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getBrandUsingGETResponse(): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/car/brand`,
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
   * @return OK
   */
  getBrandUsingGET(): __Observable<Array<string>> {
    return this.getBrandUsingGETResponse().pipe(
      __map(_r => _r.body as Array<string>)
    );
  }

  /**
   * @param model model
   * @return OK
   */
  getModelUsingGETResponse(model: string): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (model != null) __params = __params.set('model', model.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/car/model`,
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
   * @param model model
   * @return OK
   */
  getModelUsingGET(model: string): __Observable<Array<string>> {
    return this.getModelUsingGETResponse(model).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }

  /**
   * @param params The `CarControllerRestService.GetProductionDateUsingGETParams` containing the following parameters:
   *
   * - `model`: model
   *
   * - `brand`: brand
   *
   * @return OK
   */
  getProductionDateUsingGETResponse(params: CarControllerRestService.GetProductionDateUsingGETParams): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.model != null) __params = __params.set('model', params.model.toString());
    if (params.brand != null) __params = __params.set('brand', params.brand.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/car/production`,
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
   * @param params The `CarControllerRestService.GetProductionDateUsingGETParams` containing the following parameters:
   *
   * - `model`: model
   *
   * - `brand`: brand
   *
   * @return OK
   */
  getProductionDateUsingGET(params: CarControllerRestService.GetProductionDateUsingGETParams): __Observable<Array<string>> {
    return this.getProductionDateUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }
}

module CarControllerRestService {

  /**
   * Parameters for getProductionDateUsingGET
   */
  export interface GetProductionDateUsingGETParams {

    /**
     * model
     */
    model: string;

    /**
     * brand
     */
    brand: string;
  }
}

export { CarControllerRestService }
