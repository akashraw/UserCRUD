import { ApiService } from '../service/api.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { OnInit, Component, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  userData !: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api:ApiService, public dialog: MatDialog, private router:Router) { }
  
  ngOnInit() {
    // if(this.api.isSigned== false){
    //   this.router.navigate(['/login']);
    // }else{
    //   this.getAllUser()
    // }
    this.getAllUser()
    }
  getAllUser(){
    this.api.getUsers()
    .subscribe({
      next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     }, error:()=>{
      alert('Something went wrong!')
      }
    })
  }

  editUserData(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(res=>{
      if(res==='update'){
        this.getAllUser();
      }
    })
  }
  deleteUser(row:any){
    this.dialog.open(DeleteDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(res=>{
      if(res==='delete'){
        this.api.deleteUser(row.id)
        .subscribe({
          next:(res)=>{
          alert('User deleted!');
          this.getAllUser(); 
        }, error:()=>{
          alert('Something went wrong!');
        }});
      } 
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%',
    }).afterClosed().subscribe(res=>{
      if(res==='add'){
        this.getAllUser();
      }
    })
  }
  logOut(){
    // this.api.isSigned=false;
    this.router.navigate(['/login'])
  }
}