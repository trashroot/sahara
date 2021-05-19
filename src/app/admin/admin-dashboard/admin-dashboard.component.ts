import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  name = new FormControl('AA');

  ngOnInit(): void {
  }

  test(){
    console.log('oooo', this.name);
  }

}
