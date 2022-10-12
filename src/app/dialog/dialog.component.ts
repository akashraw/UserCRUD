import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  addUserForm !: FormGroup;
  autoBtn: string = 'Add';
  constructor(private form:FormBuilder, 
              private api : ApiService, 
              private dialogRef:MatDialogRef<DialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public matData:any,) { }

  ngOnInit(): void {
    this.addUserForm = this.form.group({
      name : ['',Validators.required],
      email : ['',Validators.required],
      mobile : ['',Validators.required],
    });

    if(this.matData){
      this.autoBtn='Update';
      this.addUserForm.controls['name'].setValue(this.matData.name);
      this.addUserForm.controls['email'].setValue(this.matData.email);
      this.addUserForm.controls['mobile'].setValue(this.matData.mobile);
    }
  }
  addUser(){
    if(!this.matData){
      if(this.addUserForm.valid){
        this.api.postUser(this.addUserForm.value)
        .subscribe(
          {next:(res)=>{
            alert('User added');
            this.addUserForm.reset();
            this.dialogRef.close('add');
          }, error:()=>{
            alert('Something went wrong!')
          }
        })
        }
    } else {
      this.updateUserData()
    };      
    }
    updateUserData(){
      this.api.putUserData(this.addUserForm.value, this.matData.id)
      .subscribe(res=>{
        alert('User Updated')
        this.addUserForm.reset();
        this.dialogRef.close('update');
      })
    }
  }