import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {IUsers} from "../../../core/models/Users";
import {UsersCreateComponent} from "../users-create/users-create.component";
import {UsersUpdateComponent} from "../users-update/users-update.component";
import {UsersService} from "../../../shared/services/users/users.service";

@Component({
  selector: 'app-users-read',
  templateUrl: './users-read.component.html',
  styleUrls: ['./users-read.component.scss'],
  providers:[DialogService,ConfirmationService]
})
export class UsersReadComponent implements AfterViewInit, OnInit, OnDestroy{
  user$!: Observable<IUsers[]>;
  displayedColumns: string[] = ['name','username','action'];
  dataSource = new MatTableDataSource<IUsers>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ref!: DynamicDialogRef;
  constructor(private userService: UsersService, public dialogService: DialogService,
              private confirmationRead: ConfirmationService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {}

  openDialogCreate() {
    this.ref = this.dialogService.open(UsersCreateComponent, {
      header: 'Create a new User',
      width: '70%',
      height: '25rem',
      resizable: true,
      draggable: true,
      maximizable: true
    });
    this.ref.onClose.subscribe((res) => {
      this.populateTable(true);
    });
  }

  deleteConfirmation(event: Event, username: string) {
    this.confirmationRead.confirm({
      target: event.target!,
      message: 'Are you sure that you want to delete this User?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(username);
      }
    })

  }

  deleteUser(username: string): void {
    this.userService.deleteUser(username).subscribe((resp) => {
      this.userService.message("User deleted!", "success")
      this.populateTable(true);

    }, error => {
      console.log(error)
      this.userService.message("User was not deleted!", "error");
    })
  }


  openDialogUpdate(username: string) {
    this.ref = this.dialogService.open(UsersUpdateComponent, {
      data: {
        id: username
      },
      header: 'Update an User',
      width: '70%',
      height: '25rem',
      resizable: true,
      draggable: true,
      baseZIndex: 10,
      maximizable: true
    });
    this.ref.onClose.subscribe((res) => {
      this.populateTable(true);
    });
  }

  ngAfterViewInit() {
    this.populateTable(false);
  }

  populateTable(refresh:boolean){
    this.findAll().subscribe((resp) => {
      if(!refresh) {
        this.dataSource = new MatTableDataSource<IUsers>(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.findAll().subscribe((resp) => {
          this.dataSource.data = resp;
          this.paginator._changePageSize(this.paginator.pageSize);
          this.dataSource.sort = this.sort;
        });
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  findAll(): Observable<IUsers[]> {
    return this.user$ = this.userService.findAllUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
