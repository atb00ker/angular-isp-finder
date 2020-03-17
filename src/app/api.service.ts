import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { IdetailsISP } from './app.interface';
import { environment } from '../environments/environment';
@Injectable()
export class ApiService {

  private databasebaseUrl = environment.app.databaseUrl;
  private computeUrl = environment.app.computeUrl;
  private jsonPath = './assets/data/';

  private jsonHttpheaders = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getAreaISP(pincode): Observable<IdetailsISP[]> {
    /* Returns the list of all ISPs for the pincode. */
    const path = 'isplist/' + pincode + '.json';
    return this.http.get<IdetailsISP[]>(this.databasebaseUrl + path, { headers: this.jsonHttpheaders })
      .pipe(map(data => this.convertObjectToList(data)),
        catchError(error => {
          console.error(error);
          return this.http.get(this.jsonPath + 'isplist.json').pipe(map((data) => {
            let backupData: IdetailsISP[] = [];
            /* tslint:disable:no-string-literal */
            if (data['isplist'].hasOwnProperty(pincode)) {
              backupData = this.convertObjectToList(data['isplist'][pincode]);
            }
            /* tslint:disable:no-string-literal */
            return backupData;
          }));
        }));
  }

  convertObjectToList(data): IdetailsISP[] {
    /*
    If the backend returns an object of objects,
    convert it to list. (eg: firebase can not return
    a list as of now.)
    */
    const finalData = [];
    if (data !== null) {
      for (const uid of Object.keys(data)) { finalData.push(data[uid]); }
    }
    return finalData;
  }

  addProvider(name, contact, website, pincode, uid): Observable<string> {
    /*
    Result for add provider form is send to
    this function to be send to the backend.
    */
    const body = {
      pincode,
      uid,
      values: {
        contact,
        name,
        website
      }
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain, */*',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post<string>(this.computeUrl, body, httpOptions);
  }
}
