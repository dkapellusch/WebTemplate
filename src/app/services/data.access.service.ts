import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataAccessService {

  constructor(private _http: HttpClient) { }

}
