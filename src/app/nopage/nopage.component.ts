import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopage',
  templateUrl: './nopage.component.html',
  styleUrls: ['./nopage.component.css']
})
export class NopageComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number =240;
  color: string ='primary';
  constructor() { }

  ngOnInit(): void {
  }

}
