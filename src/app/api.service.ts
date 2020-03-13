import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { IdetailsISP } from './app.interface';

@Injectable()
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000'
  // private baseUrl = 'https://freebasics-firebase.firebaseio.com/'
  private jsonPath = './assets/data/'

  private httpheaders = new HttpHeaders({ 'Content-type': 'application/json' })
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getAllISP(): Observable<IdetailsISP[]> {
    return this.http.get<IdetailsISP[]>(this.baseUrl + '/dishes/', { headers: this.httpheaders })
      .pipe(catchError(error => {
        console.log(error);
        let backup_data = this.http.get<IdetailsISP[]>(this.jsonPath + "isplist.json");
        return backup_data;
      }));
  }

  getAreaISP(pincode): Observable<IdetailsISP[]> {
    // Returns the list of all ISPs for the pincode.
    let path = '/isplist/' + pincode + '.json';
    return this.http.get<IdetailsISP[]>(this.baseUrl + path, { headers: this.httpheaders })
      .pipe(catchError(error => {
        console.error(error);
        let backup_data: IdetailsISP[] = [];
        return this.getAllISP().pipe(map(
          data => {
            if (data['isplist'].hasOwnProperty(pincode))
              backup_data = data['isplist'][pincode];
            console.log(backup_data);
            return backup_data;
          },
          internal_error => console.log(internal_error)
        ));
      }));
  }
}
