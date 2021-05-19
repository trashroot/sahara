import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { GstService } from 'src/app/services/gst.service';
import { IGST } from '../gst.interface';

@Component({
  selector: 'app-edit-gst',
  templateUrl: './edit-gst.component.html',
  styleUrls: ['./edit-gst.component.css']
})
export class EditGstComponent implements OnInit {

  title = 'Edit GST Rate';
  gstDetails: IGST[] = [];
  editForm = this.fb.group({
    SNo: [''],
    Code: ['', Validators.required],
    Rate: ['', Validators.required],
    status: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private navigate: Router,
    private gst: GstService,
    private notify: NotificationService
    ) { }

  ngOnInit(): void {
    let id:any = this.router.snapshot.paramMap.get('id');
    this.gst.getGstRateById(id).subscribe( x => {
      const data = x as IGST[];
      console.log(data);      
      this.editForm = this.fb.group({
        SNo: [data[0].id],
        Code: [data[0].Code, Validators.required],
        Rate: [data[0].Rate, Validators.required],
        status: [data[0].IsActive ? 1 : 0, Validators.required],
      });
    });
  }

  edit(){
    this.gst.updateGstRate(this.editForm.value).subscribe(() => {
      this.notify.showSuccess('Records updated successfully', 'Success');
      this.navigate.navigate(['/master/gst']);
    });
  }

}
