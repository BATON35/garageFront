/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Notification Controller
 */
@Injectable({
  providedIn: 'root',
})
class NotificationControllerService extends __BaseService {
  static readonly testUsingGETPath = '/api/web-socket';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param text text
   * @return OK
   */
  testUsingGETResponse(text: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (text != null) __params = __params.set('text', text.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/web-socket`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param text text
   * @return OK
   */
  testUsingGET(text: string): __Observable<string> {
    return this.testUsingGETResponse(text).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module NotificationControllerService {
}

export { NotificationControllerService }
