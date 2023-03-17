import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {PublisherService} from "../../../shared/services/publisher/publisher.service";
import {IPublisher} from "../../../core/models/Publisher";
import {PublisherCreateComponent} from "../publisher-create/publisher-create.component";
import {PublisherUpdateComponent} from "../publisher-update/publisher-update.component";

@Component({
  selector: 'app-publisher-read',
  templateUrl: './publisher-read.component.html',
  styleUrls: ['./publisher-read.component.scss'],
  providers:[DialogService, ConfirmationService]
})
export class PublisherReadComponent implements AfterViewInit, OnInit, OnDestroy{
  publisher$!: Observable<IPublisher[]>;
  displayedColumns: string[] = ['name','action'];
  dataSource = new MatTableDataSource<IPublisher>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ref!: DynamicDialogRef;
  constructor(private publisherService: PublisherService, public dialogService: DialogService,
              private confirmationRead: ConfirmationService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  openDialogCreate() {
    this.ref = this.dialogService.open(PublisherCreateComponent, {
      header: 'Create a new Publisher',
      width: '70%',
      height: 'auto',
      resizable: true,
      draggable: true,
      maximizable: true
    });
    this.ref.onClose.subscribe((res) => {
      this.populateTable(true);
    });
  }

  deleteConfirmation(event: Event, publisherId: string) {
    this.confirmationRead.confirm({
      target: event.target!,
      message: 'Are you sure that you want to delete this Publisher?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(publisherId);
      }
    })

  }

  delete(publisherId: string): void {
    this.publisherService.delete(publisherId).subscribe((resp) => {
      this.publisherService.message("Publisher deleted!", "success")
      this.populateTable(true);

    }, error => {
      console.log(error)
      this.publisherService.message("Publisher was not deleted!", "error");
    })
  }

  openDialogUpdate(publisherId: string) {
    this.ref = this.dialogService.open(PublisherUpdateComponent, {
      data: {
        id: publisherId
      },
      header: 'Update an Publisher',
      width: '70%',
      height: 'auto',
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
        this.dataSource = new MatTableDataSource<IPublisher>(resp);
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
  findAll(): Observable<IPublisher[]> {
    return this.publisher$ = this.publisherService.findAll();
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
