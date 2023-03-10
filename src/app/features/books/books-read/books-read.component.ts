import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BooksCreateComponent } from '../books-create/books-create.component';
import { Observable } from 'rxjs';
import {Book, IBook} from 'src/app/core/models/book';
import { BookService } from 'src/app/shared/services/book/book.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BooksUpdateComponent} from "../books-update/books-update.component";

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss'],
  providers:[DialogService]
})


export class BooksReadComponent implements AfterViewInit, OnInit, OnDestroy {
  books$!: Observable<IBook[]>;

  displayedColumns: string[] = ['id', 'name', 'asin', 'publicationYear','action'];
  dataSource = new MatTableDataSource<IBook>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ref!: DynamicDialogRef;

    constructor(private service : BookService , public  dialogService: DialogService) {}

    ngOnInit(): void {}

    openDialogCreate() {
        this.ref = this.dialogService.open(BooksCreateComponent, {
        header: 'Create a new book',
        width: '70%',
        height: 'auto',
        resizable : true,
        draggable : true,
        baseZIndex : 10,
        maximizable: true
      });
    }

    openDialogUpdate(){
      this.ref = this.dialogService.open(BooksUpdateComponent, {
        data:{
          id:'63fd2f56e029183011a9822f'
        },
        header: 'Update a Book',
        width: '70%',
        height: 'auto',
        resizable : true,
        draggable : true,
        baseZIndex : 10,
        maximizable: true
      });
    }


    ngAfterViewInit() {
        this.findAll().subscribe((resp) => {
        this.dataSource = new MatTableDataSource<IBook>(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

    findAll():Observable<IBook[]>{
      return this.books$ = this.service.findAll();
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

