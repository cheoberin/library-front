import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {AuthorService} from "../../../shared/services/author/author.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Author} from "../../../core/models/Author";

@Component({
  selector: 'app-authors-create',
  templateUrl: './authors-create.component.html',
  styleUrls: ['./authors-create.component.scss'],
  providers:[ConfirmationService]
})
export class AuthorsCreateComponent implements OnInit{
  private newAuthor!: Author;
  authorForm!: FormGroup;
  constructor( private authorService: AuthorService,private fb: FormBuilder, public ref: DynamicDialogRef,
               private confirmationCreate: ConfirmationService) { }

  create(){
    if(this.authorForm.invalid){
      this.authorService.message("Author was not created!","error");
      return;
    }
    this.newAuthor = new Author(this.authorForm.value)
    this.authorService.create(this.newAuthor).subscribe(() =>{
      this.authorService.message("Author created successfully!","success")

    }, error => {
        console.log(error)
        this.authorService.message("Author was not created!","error")
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
    this.authorForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      nationality:['',[Validators.required,Validators.minLength(3)]],
      description:['',[Validators.required],Validators.minLength(10)],
      birthDate:[null,[Validators.required]],
      registerDate:['']
    })
  }

}
