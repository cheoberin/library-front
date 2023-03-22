import {Component, OnInit} from '@angular/core';
import {Genre} from "../../../core/models/Genre";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {Publisher} from "../../../core/models/Publisher";
import {PublisherService} from "../../../shared/services/publisher/publisher.service";

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
  providers:[ConfirmationService]
})
export class PublisherCreateComponent implements OnInit{

  private newPublisher!: Publisher;
  publisherForm!: FormGroup;
  constructor( private publisherService: PublisherService,
               private fb: FormBuilder, public ref: DynamicDialogRef,
               private confirmationCreate: ConfirmationService) { }

  create(){
    if(this.publisherForm.invalid){
      this.publisherService.message("Publisher was not created!","error");
      return;
    }
    this.newPublisher = new Publisher(this.publisherForm.value)
    this.publisherService.create(this.newPublisher).subscribe(() =>{
      this.publisherService.message("Publisher created successfully!","success")

    }, error => {
      console.log(error)
      this.publisherService.message("Publisher was not created!","error")
    })
  }

  createConfirmation(){
    this.confirmationCreate.confirm({
      message: 'Are you sure that you want to create?',
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
    this.publisherForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]]
    })
  }

}
