import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GstService } from 'src/app/services/gst.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IGST } from '../gst.interface';

@Component({
  selector: 'app-add-gst',
  templateUrl: './add-gst.component.html',
  styleUrls: ['./add-gst.component.css']
})
export class AddGstComponent implements OnInit {

  title = 'Add New GST Rate';
  newRow: IGST[] = [];  
  newForm = this.fb.group({
    code: ['', Validators.required],
    rate: ['', Validators.required],
    IsActive: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private router: Router,
    private gst: GstService
    ) { }
  
  ngOnInit(): void {
  }

  add(){
    this.newRow.push(this.newForm.value);
    this.gst.addGstRate(this.newRow).subscribe(() =>  {
      this.notify.showSuccess('Record Added Sucessfully.', 'Success');
      this.router.navigate(['/master/gst']);
    });
  }

}
