import { Injectable } from '@angular/core';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BloodSupplies} from '../model/blood-supplies';
import {BloodSuppliesService} from './blood-supplies.service';
import {StockLevel} from '../model/stock-level';
import {BloodType} from '../model/blood-type';
import {GraphColumn} from '../model/graph-column';

@Injectable({
  providedIn: 'root'
})
export class UiGraphService {

  graphCurrentBloodSuppliesInCenter$: Observable<GraphColumn[]>;

  graphWeeklyBloodTypeSuppliesInCenter$: Observable<GraphColumn[]>;

  constructor(private bloodSuppliesService: BloodSuppliesService) {
    this.graphCurrentBloodSuppliesInCenter$ = this.bloodSuppliesService.currentBloodSuppliesInCenter$.pipe(
      map(data => {
        return (data.map(x => ({
          value: this.mapStockLevelToNumber(x.stockLevel),
          name: this.mapBloodGroupToString(x.bloodGroup)
        }) as GraphColumn));
      }),
      shareReplay(1),
    );

    this.graphWeeklyBloodTypeSuppliesInCenter$ = this.bloodSuppliesService.weeklyBloodTypeSuppliesInCenter$.pipe(
      map(data => {
        return (data.map(x => ({
          value: this.mapStockLevelToNumber(x.stockLevel),
          name: x.statusDate
        }) as GraphColumn));
      }),
      shareReplay(1),
    );
  }


  mapStockLevelToNumber(stockLevel: StockLevel): number {
    if (stockLevel === StockLevel.LOW) { return 11; }
    if (stockLevel === StockLevel.MID) { return 36; }
    if (stockLevel === StockLevel.OPTIMAL) { return 61; }
    if (stockLevel === StockLevel.HIGH) { return 86; }
  }

  mapBloodGroupToString(bloodType: BloodType): string {
    if (bloodType === BloodType.A_RH_MINUS) { return `A RH-`; }
    if (bloodType === BloodType.A_RH_PLUS) { return `A RH+`; }
    if (bloodType === BloodType.AB_RH_MINUS) { return `AB RH-`; }
    if (bloodType === BloodType.AB_RH_PLUS) { return `AB RH+`; }
    if (bloodType === BloodType.B_RH_MINUS) { return `B RH-`; }
    if (bloodType === BloodType.B_RH_PLUS) { return `B RH+`; }
    if (bloodType === BloodType.ZERO_RH_MINUS) { return `0 RH-`; }
    if (bloodType === BloodType.ZERO_RH_PLUS) { return `0 RH+`; }
  }
}
