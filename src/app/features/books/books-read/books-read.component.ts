import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BooksCreateComponent } from '../books-create/books-create.component';
import { Observable } from 'rxjs';
import {IBook} from 'src/app/core/models/book';
import { BookService } from 'src/app/shared/services/book/book.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BooksUpdateComponent} from "../books-update/books-update.component";
import {ConfirmationService} from "primeng/api";


@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss'],
  providers:[DialogService,ConfirmationService]
})
export class BooksReadComponent implements AfterViewInit, OnInit, OnDestroy {
  books$!: Observable<IBook[]>;
  displayedColumns: string[] = ['name', 'asin', 'publicationYear','action'];
  dataSource = new MatTableDataSource<IBook>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ref!: DynamicDialogRef;

    constructor(private service : BookService , public  dialogService: DialogService,
                private confirmationRead: ConfirmationService,
                private changeDetectorRefs: ChangeDetectorRef) {}

    ngOnInit(): void {}

    openDialogCreate() {
        this.ref = this.dialogService.open(BooksCreateComponent, {
        header: 'Create a new book',
        width: '70%',
        height: 'auto',
        resizable : true,
        draggable : true,
        maximizable: true
      });
      this.ref.onClose.subscribe((res) => {
        this.populateTable(true);
      });
    }

  deleteConfirmation(event: Event, bookId:string){
    this.confirmationRead.confirm({
      target: event.target!,
      message: 'Are you sure that you want to delete this book?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(bookId);
      }
    })
  }
  delete(bookId:string): void{
    this.service.delete(bookId).subscribe((resp) =>{
      this.service.message("Book deleted!","success")
      this.populateTable(true);
    }, error =>{
      console.log(error)
      this.service.message("Book was not deleted!","error");
    })
  }

    openDialogUpdate(bookId:string){
      this.ref = this.dialogService.open(BooksUpdateComponent, {
        data:{
          id: bookId
        },
        header: 'Update a Book',
        width: '70%',
        height: 'auto',
        resizable : true,
        draggable : true,
        baseZIndex : 10,
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
        this.dataSource = new MatTableDataSource<IBook>(resp);
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

