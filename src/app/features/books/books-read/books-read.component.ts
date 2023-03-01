import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BooksCreateComponent } from '../books-create/books-create.component';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/models/book';
import { BookService } from 'src/app/shared/services/book/book.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss'],
  providers:[DialogService]
})


export class BooksReadComponent implements AfterViewInit, OnInit, OnDestroy {
  books$!: Observable<Book[]>;

  displayedColumns: string[] = ['id', 'name', 'asin', 'publicationYear'];
  dataSource = new MatTableDataSource<Book>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ref!: DynamicDialogRef;

  constructor(private service : BookService , public  dialogService: DialogService) { }

    ngOnInit(): void {}

    openDialog() {
        this.ref = this.dialogService.open(BooksCreateComponent, {
        header: 'Create a new book',
        width: '70%',
        height: '60%'
      });
    }

  ngAfterViewInit() {
     this.findAll().subscribe((resp) => {
      this.dataSource = new MatTableDataSource<Book>(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  findAll():Observable<Book[]>{
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

