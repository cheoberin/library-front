import {Component, OnInit} from '@angular/core';
import {Author} from "../../../core/models/Author";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {AuthorService} from "../../../shared/services/author/author.service";

@Component({
  selector: 'app-authors-update',
  templateUrl: './authors-update.component.html',
  styleUrls: ['./authors-update.component.scss'],
  providers:[ConfirmationService]
})
export class AuthorsUpdateComponent implements OnInit {

  private newAuthor!: Author;
  authorForm!: FormGroup;

  constructor(private authorService: AuthorService, private fb: FormBuilder,
              private config: DynamicDialogConfig,
              public ref: DynamicDialogRef,
              private confirmationUpdate: ConfirmationService) {

    this.authorForm = this.fb.group({
      _id:[this.config.data.id],
      name:['',[Validators.required,Validators.minLength(3)]],
      nationality:['',[Validators.required,Validators.minLength(3)]],
      description:['',[Validators.required,Validators.minLength(10)]],
      birthDate:[null,[Validators.required]],
    })

  }

  getAuthorInfo(id:string){
    this.authorService.findById(id).subscribe((resp)=>{
      this.authorForm.setValue({
        _id:resp._id,
        name:resp.name,
        nationality:resp.nationality,
        description:resp.description,
        birthDate:resp.birthDate,
      })
    })
  }

  updateConfirmation(){
    this.confirmationUpdate.confirm({
      message: 'Are you sure that you want to update?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.update();
      }
    })
  }

  update(){
    if(this.authorForm.invalid){
      this.authorService.message("Author was not updated!","error");
      return;
    }
    this.newAuthor = new Author(this.authorForm.value)
    this.authorService.update(this.newAuthor).subscribe(() =>{
      this.authorService.message("Author updated successfully!","success")

    }, error => {
      console.log(error)
      this.authorService.message("Author was not updated!","error")
    })
  }

  closeForm(){
    this.confirmationUpdate.confirm({
      message: 'Are you sure that you want cancel?',
      accept: () => {
        this.ref.close();
      }
    })
  }

  ngOnInit(): void {
    this.getAuthorInfo(this.config.data.id)
  }

}
