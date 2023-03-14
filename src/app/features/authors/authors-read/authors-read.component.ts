import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {IAuthor} from "../../../core/models/Author";
import {AuthorsCreateComponent} from "../authors-create/authors-create.component";
import {AuthorService} from "../../../shared/services/author/author.service";
import {AuthorsUpdateComponent} from "../authors-update/authors-update.component";


@Component({
  selector: 'app-authors-read',
  templateUrl: './authors-read.component.html',
  styleUrls: ['./authors-read.component.scss'],
  providers:[DialogService,ConfirmationService]
})
export class AuthorsReadComponent implements AfterViewInit, OnInit, OnDestroy {
  author$!: Observable<IAuthor[]>;
  displayedColumns: string[] = ['name', 'nationality', 'action'];
  dataSource = new MatTableDataSource<IAuthor>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ref!: DynamicDialogRef;
  constructor(private authorService: AuthorService, public dialogService: DialogService,
              private confirmationRead: ConfirmationService) {
  }

  ngOnInit(): void {
  }

  openDialogCreate() {
    this.ref = this.dialogService.open(AuthorsCreateComponent, {
      header: 'Create a new book',
      width: '70%',
      height: 'auto',
      resizable: true,
      draggable: true,
      maximizable: true
    });
  }

  deleteConfirmation(event: Event, authorId: string) {
    this.confirmationRead.confirm({
      target: event.target!,
      message: 'Are you sure that you want to delete this Author?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(authorId);
      }
    })
  }

  delete(authorId: string): void {
    this.authorService.delete(authorId).subscribe((resp) => {
      this.authorService.message("Author deleted!", "success")
    }, error => {
      console.log(error)
      this.authorService.message("Author was not deleted!", "error");
    })
  }

  openDialogUpdate(authorId: string) {
    this.ref = this.dialogService.open(AuthorsUpdateComponent, {
      data: {
        id: authorId
      },
      header: 'Update a Author',
      width: '70%',
      height: 'auto',
      resizable: true,
      draggable: true,
      baseZIndex: 10,
      maximizable: true
    });
  }

  ngAfterViewInit() {
    this.findAll().subscribe((resp) => {
      this.dataSource = new MatTableDataSource<IAuthor>(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  findAll(): Observable<IAuthor[]> {
    return this.author$ = this.authorService.findAll();
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
