import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalDataService } from './globalDataService.services';

@Injectable()
export class  StocksService {

    public stockDetailUrl: string;

    constructor(private _http: HttpClient,
                private _globalDataService: GlobalDataService) {
        this.stockDetailUrl = 'http://127.0.0.1:3000/api/v1/stocks/stock-by-symbol';

    }

    sotckDetail(symbol:String): Observable<any> {
        const userRegistered = sessionStorage.getItem('USer');
        const opts = { params: new HttpParams()
                                   .append('userRegistered',userRegistered)

                     };
        return this._http.get(this.stockDetailUrl+`?symbol=${symbol}`,opts);
    }
}