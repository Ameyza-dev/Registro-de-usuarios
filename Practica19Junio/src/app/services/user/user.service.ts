import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:8080/users';

  /*--*/
  updateUser: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.URL + "/list");
  }

  public getUser(id: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + id);
  }

  public createUser(user: any): Observable<any> {
    return this.httpClient.post(this.URL + "/create", user);
  }

  public deleteUser(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/delete/" + id);
  }

  public updateUsers(id: any, user: any) {
    return this.httpClient.put(this.URL + "/update/" + id, user);
  }
}
