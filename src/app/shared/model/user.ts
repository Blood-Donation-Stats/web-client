export interface User {
  id: number;
  firstName: string;
  lastName: string;
  bloodGroup: SimpleBloodGroup;
}
export enum SimpleBloodGroup {
  O = `0`, A = `A`, B = `BB`, AB = `AB`
}
