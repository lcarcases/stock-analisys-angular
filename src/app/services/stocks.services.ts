import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StocksService {

    public stockDetailUrl: string;

    constructor(private _http: HttpClient) {
        this.stockDetailUrl = 'http://127.0.0.1:3000/api/v1/stocks/stock-by-symbol';

    }

    sotckDetail(symbol:String): Observable<any> {
        return this._http.get(this.stockDetailUrl+`?symbol=${symbol}`);
    }
}