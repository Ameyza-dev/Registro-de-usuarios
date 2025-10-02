import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private URL = 'http://localhost:8080/address';

  updateAddress: Subject<any> = new Subject<any>();


  constructor(private httpClient: HttpClient) {  }
/*
  public getAllAddress(id: number): Observable<any> {
    return this.httpClient.get(this.URL + "/by-user/" + id);
  }
*/

public getAllAddress(uiser_id: number): Observable<any> {
  return this.httpClient.get(this.URL + "/by-user/" + uiser_id);
}
  public getAddress(id: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + id);
  }

  public createAddress(user_id: number,address: any): Observable<any> {
    return this.httpClient.post(this.URL + "/create/" + user_id, address);
  }

  public deleteAddress(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/delete/" + id);
  }

  public updateAdrress(id: any, address: any) {
    return this.httpClient.put(this.URL + "/update/" + id, address);
  }

}
