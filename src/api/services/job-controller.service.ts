/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageJobDto } from '../models/page-job-dto';
import { JobDto } from '../models/job-dto';
import { JobHistory } from '../models/job-history';
import { JobStatisticIncome } from '../models/job-statistic-income';

/**
 * Job Controller
 */
@Injectable({
  providedIn: 'root',
})
class JobControllerService extends __BaseService {
  static readonly getJobListUsingGETPath = '/api/job';
  static readonly saveJobUsingPOSTPath = '/api/job';
  static readonly updateJobUsingPUTPath = '/api/job';
  static readonly getJobHistoryUsingGETPath = '/api/job/history';
  static readonly getStatisticUsingGETPath = '/api/job/statistic';
  static readonly getJobByIdUsingGETPath = '/api/job/{id}';
  static readonly deleteJobUsingDELETEPath = '/api/job/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `JobControllerService.GetJobListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getJobListUsingGETResponse(params: JobControllerService.GetJobListUsingGETParams): __Observable<__StrictHttpResponse<PageJobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/job`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageJobDto>;
      })
    );
  }
  /**
   * @param params The `JobControllerService.GetJobListUsingGETParams` containing the following parameters:
   *
   * - `size`: size
   *
   * - `page`: page
   *
   * @return OK
   */
  getJobListUsingGET(params: JobControllerService.GetJobListUsingGETParams): __Observable<PageJobDto> {
    return this.getJobListUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageJobDto)
    );
  }

  /**
   * @param jobDto jobDto
   * @return OK
   */
  saveJobUsingPOSTResponse(jobDto: JobDto): __Observable<__StrictHttpResponse<JobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = jobDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/job`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JobDto>;
      })
    );
  }
  /**
   * @param jobDto jobDto
   * @return OK
   */
  saveJobUsingPOST(jobDto: JobDto): __Observable<JobDto> {
    return this.saveJobUsingPOSTResponse(jobDto).pipe(
      __map(_r => _r.body as JobDto)
    );
  }

  /**
   * @param jobDto jobDto
   * @return OK
   */
  updateJobUsingPUTResponse(jobDto: JobDto): __Observable<__StrictHttpResponse<JobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = jobDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/job`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JobDto>;
      })
    );
  }
  /**
   * @param jobDto jobDto
   * @return OK
   */
  updateJobUsingPUT(jobDto: JobDto): __Observable<JobDto> {
    return this.updateJobUsingPUTResponse(jobDto).pipe(
      __map(_r => _r.body as JobDto)
    );
  }

  /**
   * @param vehicleId vehicleId
   * @return OK
   */
  getJobHistoryUsingGETResponse(vehicleId?: number): __Observable<__StrictHttpResponse<Array<JobHistory>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (vehicleId != null) __params = __params.set('vehicleId', vehicleId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/job/history`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<JobHistory>>;
      })
    );
  }
  /**
   * @param vehicleId vehicleId
   * @return OK
   */
  getJobHistoryUsingGET(vehicleId?: number): __Observable<Array<JobHistory>> {
    return this.getJobHistoryUsingGETResponse(vehicleId).pipe(
      __map(_r => _r.body as Array<JobHistory>)
    );
  }

  /**
   * @return OK
   */
  getStatisticUsingGETResponse(): __Observable<__StrictHttpResponse<Array<JobStatisticIncome>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/job/statistic`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<JobStatisticIncome>>;
      })
    );
  }
  /**
   * @return OK
   */
  getStatisticUsingGET(): __Observable<Array<JobStatisticIncome>> {
    return this.getStatisticUsingGETResponse().pipe(
      __map(_r => _r.body as Array<JobStatisticIncome>)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getJobByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<JobDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/job/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<JobDto>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getJobByIdUsingGET(id: number): __Observable<JobDto> {
    return this.getJobByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as JobDto)
    );
  }

  /**
   * @param id id
   */
  deleteJobUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/job/${id}`,
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
  deleteJobUsingDELETE(id: number): __Observable<null> {
    return this.deleteJobUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module JobControllerService {

  /**
   * Parameters for getJobListUsingGET
   */
  export interface GetJobListUsingGETParams {

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

export { JobControllerService }
