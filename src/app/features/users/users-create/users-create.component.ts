import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {UsersService} from "../../../shared/services/users/users.service";
import {Users} from "../../../core/models/Users";
import {IRoles} from "../../../core/models/Roles";


@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
  providers:[ConfirmationService]
})
export class UsersCreateComponent implements OnInit{

  private newUser!: Users;
  usersForm!: FormGroup;

  roles!: IRoles[];
  constructor( private usersService: UsersService,
               private fb: FormBuilder, public ref: DynamicDialogRef,
               private confirmationCreate: ConfirmationService) { }

  create(){
    if(this.usersForm.invalid){
      this.usersService.message("User was not created!","error");
      return;
    }
    this.newUser = new Users(this.usersForm.value)
    this.usersService.create(this.newUser).subscribe(() =>{
      this.usersService.message("User created successfully!","success")

    }, error => {
      console.log(error)
      this.usersService.message("User was not created!","error")
    })

  }
  getMultiselectInfos(){
    this.usersService.findAllRoles().subscribe((resp) =>{
      this.roles = resp;
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
    this.usersForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      username:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      roles:['',[Validators.required]]
    })
    this.getMultiselectInfos();
  }
}
