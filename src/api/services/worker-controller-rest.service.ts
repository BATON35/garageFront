/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { WorkerStatisticSell } from '../models/worker-statistic-sell';
import { WorkerDto } from '../models/worker-dto';
import { Worker } from '../models/worker';
import { PageWorkerDto } from '../models/page-worker-dto';

/**
 * Worker Controller Rest
 */
@Injectable({
  providedIn: 'root',
})
class WorkerControllerRestService extends __BaseService {
  static readonly getStatisticUsingGETPath = '/api/workers';
  static readonly saveWorkerUsingPOSTPath = '/api/workers';
  static readonly updateWorkerUsingPUTPath = '/api/workers';
  static readonly autocompleteWorkerUsingGETPath = '/api/workers/autoComplete';
  static readonly searchWorkerUsingGETPath = '/api/workers/search';
  static readonly getWorkerByIdUsingGETPath = '/api/workers/{id}';
  static readonly deleteWorkerUsingDELETEPath = '/api/workers/{id}';
  static readonly getWorkerListUsingGETPath = '/api/workers/{page}/{size}/{hasRole}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getStatisticUsingGETResponse(): __Observable<__StrictHttpResponse<Array<WorkerStatisticSell>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/workers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<WorkerStatisticSell>>;
      })
    );
  }
  /**
   * @return OK
   */
  getStatisticUsingGET(): __Observable<Array<WorkerStatisticSell>> {
    return this.getStatisticUsingGETResponse().pipe(
      __map(_r => _r.body as Array<WorkerStatisticSell>)
    );
  }

  /**
   * @param workerDto workerDto
   * @return OK
   */
  saveWorkerUsingPOSTResponse(workerDto: WorkerDto): __Observable<__StrictHttpResponse<WorkerDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = workerDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/workers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<WorkerDto>;
      })
    );
  }
  /**
   * @param workerDto workerDto
   * @return OK
   */
  saveWorkerUsingPOST(workerDto: WorkerDto): __Observable<WorkerDto> {
    return this.saveWorkerUsingPOSTResponse(workerDto).pipe(
      __map(_r => _r.body as WorkerDto)
    );
  }

  /**
   * @param workerDto workerDto
   * @return OK
   */
  updateWorkerUsingPUTResponse(workerDto: WorkerDto): __Observable<__StrictHttpResponse<Worker>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = workerDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/workers`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Worker>;
      })
    );
  }
  /**
   * @param workerDto workerDto
   * @return OK
   */
  updateWorkerUsingPUT(workerDto: WorkerDto): __Observable<Worker> {
    return this.updateWorkerUsingPUTResponse(workerDto).pipe(
      __map(_r => _r.body as Worker)
    );
  }

  /**
   * @param text text
   * @return OK
   */
  autocompleteWorkerUsingGETResponse(text: string): __Observable<__StrictHttpResponse<Array<WorkerDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (text != null) __params = __params.set('text', text.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/workers/autoComplete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<WorkerDto>>;
      })
    );
  }
  /**
   * @param text text
   * @return OK
   */
  autocompleteWorkerUsingGET(text: string): __Observable<Array<WorkerDto>> {
    return this.autocompleteWorkerUsingGETResponse(text).pipe(
      __map(_r => _r.body as Array<WorkerDto>)
    );
  }

  /**
   * @param params The `WorkerControllerRestService.SearchWorkerUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `searchText`: searchText
   *
   * - `page`: page
   *
   * @return OK
   */
  searchWorkerUsingGETResponse(params: WorkerControllerRestService.SearchWorkerUsingGETParams): __Observable<__StrictHttpResponse<PageWorkerDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.searchText != null) __params = __params.set('searchText', params.searchText.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/workers/search`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageWorkerDto>;
      })
    );
  }
  /**
   * @param params The `WorkerControllerRestService.SearchWorkerUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `searchText`: searchText
   *
   * - `page`: page
   *
   * @return OK
   */
  searchWorkerUsingGET(params: WorkerControllerRestService.SearchWorkerUsingGETParams): __Observable<PageWorkerDto> {
    return this.searchWorkerUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageWorkerDto)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getWorkerByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<WorkerDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/workers/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<WorkerDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getWorkerByIdUsingGET(id: number): __Observable<WorkerDto> {
    return this.getWorkerByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as WorkerDto)
    );
  }

  /**
   * @param id id
   */
  deleteWorkerUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/workers/${id}`,
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
  deleteWorkerUsingDELETE(id: number): __Observable<null> {
    return this.deleteWorkerUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `WorkerControllerRestService.GetWorkerListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * - `hasRole`: hasRole
   *
   * @return OK
   */
  getWorkerListUsingGETResponse(params: WorkerControllerRestService.GetWorkerListUsingGETParams): __Observable<__StrictHttpResponse<PageWorkerDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/workers/${params.page}/${params.size}/${params.hasRole}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageWorkerDto>;
      })
    );
  }
  /**
   * @param params The `WorkerControllerRestService.GetWorkerListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * - `hasRole`: hasRole
   *
   * @return OK
   */
  getWorkerListUsingGET(params: WorkerControllerRestService.GetWorkerListUsingGETParams): __Observable<PageWorkerDto> {
    return this.getWorkerListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageWorkerDto)
    );
  }
}

module WorkerControllerRestService {

  /**
   * Parameters for searchWorkerUsingGET
   */
  export interface SearchWorkerUsingGETParams {

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
   * Parameters for getWorkerListUsingGET
   */
  export interface GetWorkerListUsingGETParams {

    /**
     * size
     */
    size: number;

    /**
     * page
     */
    page: number;

    /**
     * hasRole
     */
    hasRole: boolean;
  }
}

export { WorkerControllerRestService }
