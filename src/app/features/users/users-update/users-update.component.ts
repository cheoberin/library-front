import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {Users} from "../../../core/models/Users";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IRoles} from "../../../core/models/Roles";
import {UsersService} from "../../../shared/services/users/users.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.scss'],
  providers:[ConfirmationService]
})
export class UsersUpdateComponent implements OnInit{
  private newUser!: Users;
  usersForm!: FormGroup;
  roles!: IRoles[];
  constructor( private usersService: UsersService,
               private fb: FormBuilder, public ref: DynamicDialogRef,
               private config: DynamicDialogConfig,
               private confirmationCreate: ConfirmationService) {

    this.usersForm = this.fb.group({
      _id:[this.config.data.id],
      name:['',[Validators.required,Validators.minLength(4)]],
      username:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      roles:['',[Validators.required]]
    });
  }

  update(){
    if(this.usersForm.invalid){
      this.usersService.message("User was not updated!","error");
      return;
    }
    this.newUser = new Users(this.usersForm.value)
    this.usersService.update(this.newUser).subscribe(() =>{
      this.usersService.message("User updated successfully!","success")

    }, error => {
      console.log(error)
      this.usersService.message("User was not updated!","error")
    })

  }
  getInfos(id:string){
    this.usersService.findById(id).subscribe((resp)=>{
      this.usersForm.setValue({
        _id:resp._id,
        name:resp.name,
        username:resp.username,
        password:resp.password,
        roles:resp.roles
      })

    })
    this.getMultiselectInfos()
  }

  getMultiselectInfos(){
    this.usersService.findAllRoles().subscribe((resp) =>{
      this.roles = resp;
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
    this.getInfos(this.config.data.id);
  }
}
