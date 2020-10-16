import {Component, OnInit} from '@angular/core';
import {BloodCenterService} from '../../shared/services/blood-center.service';
import {Observable, of} from 'rxjs';
import {BloodCenter} from '../../shared/model/blood-center';
import {BloodSuppliesService} from '../../shared/services/blood-supplies.service';
import {BloodSupplies} from '../../shared/model/blood-supplies';
import {tap} from 'rxjs/operators';
import {UiGraphService} from '../../shared/services/ui-graph.service';
import {GraphColumn} from '../../shared/model/graph-column';
import {BloodType} from '../../shared/model/blood-type';


@Component({
  selector: 'app-blood-supplies',
  templateUrl: './blood-supplies.component.html',
  styleUrls: ['./blood-supplies.component.css']
})
export class BloodSuppliesComponent{
  bloodTypes = Object.keys(BloodType) as BloodType[];
  // options
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = false;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Blood Group';
  showYAxisLabel = true;
  yAxisLabel = 'Stock Level';
  tooltipDisabled = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2B6BAA', '#AC2C2C', '#6AA6A6']
  };

  selectCenterLoading = true;
  bloodCenters$: Observable<BloodCenter[]>;

  viewCurrentLoading = false;
  graphDataCurrentBloodSuppliesInCenter$: Observable<GraphColumn[]>;

  viewWeeklyLoading = false;
  graphDataWeeklyBloodTypeSuppliesInCenter$: Observable<GraphColumn[]>;

  constructor(private bloodCenterService: BloodCenterService,
              private bloodSuppliesService: BloodSuppliesService,
              private graphService: UiGraphService) {

    this.bloodCenters$ = this.bloodCenterService.bloodCenters$.pipe(
      tap(() => this.selectCenterLoading = false)
    );

    this.graphDataCurrentBloodSuppliesInCenter$ = this.graphService.graphCurrentBloodSuppliesInCenter$.pipe(
      tap(() => this.viewCurrentLoading = false),
    );

    this.graphDataWeeklyBloodTypeSuppliesInCenter$ = this.graphService.graphWeeklyBloodTypeSuppliesInCenter$.pipe(
      tap(() => this.viewWeeklyLoading = false),
    );
  }

  onSelectBloodCenters(bloodCenterId: number): void {
    this.viewCurrentLoading = true;
    this.bloodSuppliesService.selectedBloodCenter(bloodCenterId);
  }

  onSelectBloodGroup(bloodType: BloodType): void {
    this.bloodSuppliesService.selectedBloodGroup(bloodType);
  }
}
