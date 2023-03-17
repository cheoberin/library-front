import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GenresService} from "../../../shared/services/genres/genres.service";
import {IGenre} from "../../../core/models/Genre";
import {GenresCreateComponent} from "../genres-create/genres-create.component";
import {GenresUpdateComponent} from "../genres-update/genres-update.component";

@Component({
  selector: 'app-genres-read',
  templateUrl: './genres-read.component.html',
  styleUrls: ['./genres-read.component.scss'],
  providers:[DialogService, ConfirmationService]
})
export class GenresReadComponent implements AfterViewInit, OnInit, OnDestroy{
  genre$!: Observable<IGenre[]>;
  displayedColumns: string[] = ['name','action'];
  dataSource = new MatTableDataSource<IGenre>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ref!: DynamicDialogRef;
  constructor(private genreService: GenresService, public dialogService: DialogService,
              private confirmationRead: ConfirmationService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit(): void {}

  openDialogCreate() {
    this.ref = this.dialogService.open(GenresCreateComponent, {
      header: 'Create a new Genre',
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

  deleteConfirmation(event: Event, genreId: string) {
    this.confirmationRead.confirm({
      target: event.target!,
      message: 'Are you sure that you want to delete this Genre?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(genreId);
      }
    })

  }

  delete(genreId: string): void {
    this.genreService.delete(genreId).subscribe((resp) => {
      this.genreService.message("Genre deleted!", "success")
      this.populateTable(true);

    }, error => {
      console.log(error)
      this.genreService.message("Genre was not deleted!", "error");
    })
  }

  openDialogUpdate(genreId: string) {
    this.ref = this.dialogService.open(GenresUpdateComponent, {
      data: {
        id: genreId
      },
      header: 'Update an Genre',
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
        this.dataSource = new MatTableDataSource<IGenre>(resp);
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
  findAll(): Observable<IGenre[]> {
    return this.genre$ = this.genreService.findAll();
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
