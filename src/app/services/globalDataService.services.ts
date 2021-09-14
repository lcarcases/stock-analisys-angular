import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class  GlobalDataService {

    public registeredUser: any;

    constructor() {
        this.registeredUser = null
    }

    setRegisteredUser(registeredUser:any) {
        this.registeredUser = registeredUser;
    }

    getRegisteredUser(): any {
        return this.registeredUser || sessionStorage.getItem('USer');
    }

    toString(): string {
       return JSON.stringify(this.registeredUser);
    }
}