import {StockLevel} from './stock-level';
import {BloodType} from './blood-type';

export interface BloodSupplies {
  id: number;
  bloodGroup: BloodType;
  stockLevel: StockLevel;
  statusDate: string;
  bloodCenterId: number;
}
