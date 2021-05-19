import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { PartyCategoryService } from 'src/app/services/party-category.service';
import { IPartCatatory } from '../party-category.interface';

@Component({
  selector: 'app-edit-party-category',
  templateUrl: './edit-party-category.component.html',
  styleUrls: ['./edit-party-category.component.css']
})
export class EditPartyCategoryComponent implements OnInit {

  title = 'Edit Category';
  updatePartyCategory: any = 0;
  partyCatDetails!: IPartCatatory[];

  partyForm = this.fb.group({
    SNo: [''],
    code: ['', Validators.required],
    name: ['', Validators.required],
    status: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private navigate: Router,
    private partyCat: PartyCategoryService,
    private notify: NotificationService
    ) { }

  ngOnInit(): void {
    this.updatePartyCategory = this.router.snapshot.paramMap.get('id');
    this.partyCat.getPartyCategoryById(this.updatePartyCategory).subscribe( x => {
      const data = x as IPartCatatory[];
      this.partyForm = this.fb.group({
        SNo: [data[0].id],
        code: [data[0].Code, Validators.required],
        name: [data[0].Name, Validators.required],
        status: [data[0].IsActive ? 1 : 0, Validators.required],
      });
    });
  }

  editParty(){
    this.partyCat.updatePartyCategory(this.partyForm.value).subscribe(() => {
      this.notify.showSuccess('Records updated successfully', 'Success');
      this.navigate.navigate(['/master/party-category']);
    });
  }

}
