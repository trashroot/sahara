import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PartyCategoryService } from 'src/app/services/party-category.service';
import { NotificationService } from 'src/app/services/notification.service';

import { IPartCatatory } from '../party-category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-party-category',
  templateUrl: './add-party-category.component.html',
  styleUrls: ['./add-party-category.component.css']
})
export class AddPartyCategoryComponent implements OnInit {
  constructor(
      private fb: FormBuilder,
      private partyCat: PartyCategoryService,
      private router: Router,
      private notify: NotificationService
    ) { }

  title = 'Add New Category';
  newRow: IPartCatatory[] = [];

  partyCategoryForm = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    IsActive: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  addPartyCategory(){
    this.newRow.push(this.partyCategoryForm.value);
    this.partyCat.addPartyCategory(this.newRow).subscribe(() =>  {
      this.notify.showSuccess('Record Added Sucessfully.', 'Success');
      this.router.navigate(['/master/party-category']);
    });
  }

}
