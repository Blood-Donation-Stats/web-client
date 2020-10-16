import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserService} from '../../shared/services/user.service';
import {merge, Observable, of, Subject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {SimpleBloodGroup, User} from '../../shared/model/user';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-blood-donor',
  templateUrl: './blood-donors.component.html',
  styleUrls: ['./blood-donors.component.css']
})
export class BloodDonorsComponent implements OnInit, AfterViewInit {
  bloodTypes = Object.keys(SimpleBloodGroup) as SimpleBloodGroup[];
  form: any;
  disabledId: true;
  isEditMode: boolean = false;

  displayedColumns = ['id', 'firstName', 'lastName', 'bloodGroup', 'action'];
  data: User[];

  private refreshSubject = new Subject<boolean>();
  private refreshAction$ = this.refreshSubject.asObservable();

  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: {value: null, disabled: true},
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      bloodGroup: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.refreshAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.get(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => this.data = data);
  }

  onAddDonor(): void {
    if (this.form.valid) {
      const user = this.form.value as User;
      this.userService.postNewDonor(user).subscribe(
        data => {
          this.openSnackBar(data.firstName + ` ` + data.lastName, `Success Add`);
          this.onRefresh();
        }
      );
    }


  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onRefresh(): void {
    this.refreshSubject.next(true);
  }

  onEditDonor(): void {
    const user = this.form.getRawValue() as User;
    this.userService.putNewDonor(user).subscribe(
      data => {
        this.openSnackBar(data.firstName + ` ` + data.lastName, `Success Edit`);
        this.onRefresh();
      }
    );
  }

  turnAddMode(): void {
    this.form.reset();
    this.isEditMode = false;
  }

  turnEditMode(id: number): void {
    const user = this.data.filter( x => x.id === id).pop();
    this.form.patchValue(user);
    this.isEditMode = true;
  }

  onDeleteDonor(id: number): void {
    this.userService.deleteDonor(id).subscribe(
      data => {
        this.openSnackBar(data.firstName + ` ` + data.lastName, `Success Delete`);
        this.onRefresh();
      }
    );
  }
}



