import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, Subject} from 'rxjs';
import {shareReplay, switchMap, tap} from 'rxjs/operators';
import {BloodSupplies} from '../model/blood-supplies';
import {BloodType} from '../model/blood-type';


@Injectable({
  providedIn: 'root'
})
export class BloodSuppliesService {
  private URL_BASE_CURRENT = `http://localhost:8080/blood-supplies/api/v1/blood-supplies/current/`;
  private URL_BASE_WEEKLY = 'http://localhost:8080/blood-supplies/api/v1/blood-supplies/weekly-stats/blood-group/';

  currentBloodSuppliesInCenter$: Observable<BloodSupplies[]>;
  weeklyBloodTypeSuppliesInCenter$: Observable<BloodSupplies[]>;

  private bloodCenterSelectedSubject = new Subject<number>();
  private bloodCenterSelectedAction$: Observable<number>;

  private bloodGroupSelectedSubject = new Subject<BloodType>();
  private bloodGroupSelectedAction$: Observable<BloodType>;

  constructor(private http: HttpClient) {
    this.bloodCenterSelectedAction$ = this.bloodCenterSelectedSubject.asObservable();
    this.bloodGroupSelectedAction$ = this.bloodGroupSelectedSubject.asObservable();

    this.currentBloodSuppliesInCenter$ = this.bloodCenterSelectedAction$.pipe(
      tap(        bloodCenterId => console.log(`Send for current BloodSupplies By Center on Id: ${bloodCenterId}`)),
        switchMap(bloodCenterId =>
          this.http.get<BloodSupplies[]>(`${this.URL_BASE_CURRENT}${bloodCenterId}`).pipe(
            tap( data => {
              console.log(`Get current BloodSupplies By Center on Id: ${bloodCenterId}`);
              console.log(JSON.stringify(data));
            })
          )
        ),
      shareReplay(1),
      );

    this.weeklyBloodTypeSuppliesInCenter$ = combineLatest([this.bloodGroupSelectedAction$, this.bloodCenterSelectedAction$]).pipe(
      tap(        ([bloodType, bloodCenterId]) =>
        console.log(`Send for weekly BloodSupplies By Center on Id: ${bloodCenterId} on BloodType: ${bloodType}`)),
      switchMap(([bloodType, bloodCenterId]) =>
        this.http.get<BloodSupplies[]>(`${this.URL_BASE_WEEKLY}${bloodCenterId}?bloodGroup=${bloodType}`).pipe(
          tap( data => {
            console.log(`Get weekly BloodSupplies By Center on Id: ${bloodCenterId} on BloodType: ${bloodType}`);
            console.log(JSON.stringify(data));
          })
        )
      ),
      shareReplay(1),
    );

  }

  selectedBloodCenter(bloodCenterId: number): void {
    this.bloodCenterSelectedSubject.next(bloodCenterId);
  }

  selectedBloodGroup(bloodGroup: BloodType): void {
    this.bloodGroupSelectedSubject.next(bloodGroup);
  }
}
