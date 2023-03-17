import {Component, OnInit} from '@angular/core';
import {Genre} from "../../../core/models/Genre";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {Publisher} from "../../../core/models/Publisher";
import {PublisherService} from "../../../shared/services/publisher/publisher.service";

@Component({
  selector: 'app-publisher-update',
  templateUrl: './publisher-update.component.html',
  styleUrls: ['./publisher-update.component.scss'],
  providers:[
    ConfirmationService
  ]

})
export class PublisherUpdateComponent implements OnInit{

  private newPublisher!: Publisher;
  publisherForm!: FormGroup;
  constructor( private publisherService: PublisherService ,private fb: FormBuilder,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef, private confirmationUpdate: ConfirmationService) {

    this.publisherForm = this.fb.group({
      id:[this.config.data.id],
      name:['',[Validators.required,Validators.minLength(3)]]
    })


  }

  update(){
    if(this.publisherForm.invalid){
      this.publisherService.message("Publisher was not updated!","error");
      return;
    }
    this.newPublisher = new Genre(this.publisherForm.value)
    this.publisherService.update(this.newPublisher).subscribe(() =>{
      this.publisherService.message("Publisher updated successfully!","success")

    }, error => {
      console.log(error)
      this.publisherService.message("Publisher was not updated!","error")
    })
  }

  getGenreInfo(id:string){
    this.publisherService.findById(id).subscribe((resp)=>{
      this.publisherForm.setValue({
        id:resp.id,
        name:resp.name,
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

  closeForm(){
    this.confirmationUpdate.confirm({
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
