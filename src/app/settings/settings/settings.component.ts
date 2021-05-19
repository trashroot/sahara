import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ISettings } from './setting.interface'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  title = 'Settings';
  gstDetails: ISettings[] = [];
  editForm = this.fb.group({
    SNo: [''],
    Name: ['', Validators.required],
    Address: ['', Validators.required],
    GSTNo: ['', Validators.required],
    PhoneNo: ['', Validators.required],
    DLNo: ['', Validators.required],
    ExpAlertDays: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private navigate: Router,
    private setting: SettingsService,
    private notify: NotificationService
    ) { }

  ngOnInit(): void {
    // let id:any = this.router.snapshot.paramMap.get('id');
    this.setting.getSettings().subscribe( x => {
      const data = x as ISettings[];
      this.editForm = this.fb.group({
        SNo: [data[0].id],
        Name: [data[0].Name, Validators.required],
        Address: [data[0].Address, Validators.required],
        GSTNo: [data[0].GSTNo, Validators.required],
        PhoneNo: [data[0].PhoneNo, Validators.required],
        DLNo: [data[0].DLNo, Validators.required],
        ExpAlertDays: [data[0].ExpAlertDays, Validators.required],
      });
    });
  }

  edit(){
    this.setting.updateSettings(this.editForm.value).subscribe(() => {
      this.notify.showSuccess('Records updated successfully', 'Success');
    });
  }

}
