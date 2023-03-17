import {Component, OnInit} from '@angular/core';
import {Genre} from "../../../core/models/Genre";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenresService} from "../../../shared/services/genres/genres.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-genres-update',
  templateUrl: './genres-update.component.html',
  styleUrls: ['./genres-update.component.scss'],
  providers:[ConfirmationService]
})
export class GenresUpdateComponent implements OnInit{

  private newGenre!: Genre;
  genreForm!: FormGroup;
  constructor( private genreService: GenresService ,private fb: FormBuilder,
               private config: DynamicDialogConfig,
               public ref: DynamicDialogRef, private confirmationCreate: ConfirmationService) {

    this.genreForm = this.fb.group({
      id:[this.config.data.id],
      name:['',[Validators.required,Validators.minLength(3)]]
    })


  }

  update(){
    if(this.genreForm.invalid){
      this.genreService.message("Genre was not updated!","error");
      return;
    }
    this.newGenre = new Genre(this.genreForm.value)
    this.genreService.update(this.newGenre).subscribe(() =>{
      this.genreService.message("Genre updated successfully!","success")

    }, error => {
      console.log(error)
      this.genreService.message("Genre was not updated!","error")
    })
  }

  getGenreInfo(id:string){
    this.genreService.findById(id).subscribe((resp)=>{
      this.genreForm.setValue({
        id:resp.id,
        name:resp.name,
      })
    })
  }

  updateConfirmation(){
    this.confirmationCreate.confirm({
      message: 'Are you sure that you want to update?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.update();
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
    this.getGenreInfo(this.config.data.id)
  }
}
