import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BloodSuppliesComponent} from '../pages/blood-supplies/blood-supplies.component';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BloodDonorsComponent} from '../pages/blood-donors/blood-donors.component';
import { MenuComponent } from './components/menu/menu.component';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from '../pages/home/home.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    BloodSuppliesComponent,
    BloodDonorsComponent,
    MenuComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    HttpClientModule,
    NgxChartsModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    NgxChartsModule,
    FlexLayoutModule,
    BloodSuppliesComponent,
    BloodDonorsComponent,
    MenuComponent,
    HomeComponent,
  ]
})
export class SharedModule { }
