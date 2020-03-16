import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { IdetailsISP } from './app.interface';

@Injectable()
export class ApiService {

  private databasebaseUrl = 'https://freebasics-firebase.firebaseio.com/';
  private setBaseUrl = 'https://us-central1-freebasics-firebase.cloudfunctions.net/addProvider';
  // private setBaseUrl = 'http://localhost:5001/freebasics-firebase/us-central1/addProvider';
  private jsonPath = './assets/data/';

  private jsonHttpheaders = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getAllISP(): Observable<IdetailsISP[]> {
    /* Get all the stored ISPs */
    return this.http.get<IdetailsISP[]>(this.databasebaseUrl + 'isplist.json', { headers: this.jsonHttpheaders })
      .pipe(catchError(error => {
        console.log(error);
        const backupData = this.http.get<IdetailsISP[]>(this.jsonPath + 'isplist.json')
          .pipe(map((data) => this.convertObjectToList(data)));
        return backupData;
      }));
  }

  getAreaISP(pincode): Observable<IdetailsISP[]> {
    /* Returns the list of all ISPs for the pincode. */
    const path = 'isplist/' + pincode + '.json';
    return this.http.get<IdetailsISP[]>(this.databasebaseUrl + path, { headers: this.jsonHttpheaders })
      .pipe(map(data => this.convertObjectToList(data)),
        catchError(error => {
          console.error(error);
          let backupData: IdetailsISP[] = [];
          return this.getAllISP().pipe(map(data => {
            /* tslint:disable:no-string-literal */
            if (data['isplist'].hasOwnProperty(pincode)) {
              backupData = data['isplist'][pincode];
            }
            /* tslint:enable:no-string-literal */
            return backupData;
          },
            internalError => console.log(internalError)
          ));
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
    return this.http.post<string>(this.setBaseUrl, body, httpOptions);
  }
}
