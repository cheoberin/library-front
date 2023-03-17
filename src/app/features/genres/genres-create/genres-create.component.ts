import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {Author} from "../../../core/models/Author";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Genre} from "../../../core/models/Genre";
import {GenresService} from "../../../shared/services/genres/genres.service";

@Component({
  selector: 'app-genres-create',
  templateUrl: './genres-create.component.html',
  styleUrls: ['./genres-create.component.scss'],
  providers:[ConfirmationService]
})
export class GenresCreateComponent implements OnInit{
  private newGenre!: Genre;
    genreForm!: FormGroup;
    constructor( private genreService: GenresService ,private fb: FormBuilder, public ref: DynamicDialogRef,
      private confirmationCreate: ConfirmationService) { }

    create(){
      if(this.genreForm.invalid){
        this.genreService.message("Genre was not created!","error");
        return;
      }
      this.newGenre = new Genre(this.genreForm.value)
      this.genreService.create(this.newGenre).subscribe(() =>{
        this.genreService.message("Genre created successfully!","success")

      }, error => {
        console.log(error)
        this.genreService.message("Genre was not created!","error")
      })
    }

    createConfirmation(){
    this.confirmationCreate.confirm({
      message: 'Are you sure that you want to update?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.create();
      }
    })
  }

  closeForm(){
    this.confirmationCreate.confirm({
      message: 'Are you sure that you want cancel?',
      accept: () => {
        this.ref.close();
      }
    })
  }

  ngOnInit(): void {
    this.genreForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]]
    })
  }

}
