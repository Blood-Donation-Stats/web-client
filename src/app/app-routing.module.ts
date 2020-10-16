import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BloodSuppliesComponent} from './pages/blood-supplies/blood-supplies.component';
import {BloodDonorsComponent} from './pages/blood-donors/blood-donors.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'supplies', component: BloodSuppliesComponent },
  { path: 'donors', component: BloodDonorsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
