import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BloodCenter} from '../model/blood-center';
import {shareReplay, tap} from 'rxjs/operators';

const URL = `http://localhost:8080/blood-supplies/api/v1/blood-centers`;

@Injectable({
  providedIn: 'root'
})
export class BloodCenterService {

  bloodCenters$: Observable<BloodCenter[]>;

  constructor(private http: HttpClient) {
    this.bloodCenters$ = this.http.get<BloodCenter[]>(URL)
    .pipe(
      tap( data => {
        console.log(`Get All BloodCenters`);
        console.log(JSON.stringify(data));
      }),
      shareReplay(1),
    );
  }


}
