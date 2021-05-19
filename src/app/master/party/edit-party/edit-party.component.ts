import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { PartyCategoryService } from 'src/app/services/party-category.service';
import { PartyService } from 'src/app/services/party.service';
import { IPartCatatory } from '../../part-category/party-category.interface';
import { IParty } from '../party.interface';

@Component({
  selector: 'app-edit-party',
  templateUrl: './edit-party.component.html',
  styleUrls: ['./edit-party.component.css']
})
export class EditPartyComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private party: PartyService,
    private partCat: PartyCategoryService,
    private notify: NotificationService,
    private navigate: Router,
    private router: ActivatedRoute,
    ) { }

  title = 'Edit Party';

  partyForm = this.fb.group({
    SNo: [''],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Category: ['', Validators.required],
    Address1: ['', Validators.required],
    Address2: ['', Validators.required],
    Phone: ['', Validators.required],
    IsActive: ['', Validators.required]
  });

  partyCategories: IPartCatatory[] = []
  subspt: Subscription = new Subscription()

  ngOnInit(): void {
    let partCatSub = this.partCat.getPartyCategory().subscribe( categories => {
      this.partyCategories = <IPartCatatory[]>categories
    })
    this.subspt.add(partCatSub);

    let updateParty:any = this.router.snapshot.paramMap.get('id');
    this.party.getPartyById(updateParty).pipe(take(1)).subscribe( data => {
      const party = <IParty[]>data
      this.partyForm = this.fb.group({
        SNo: [party[0].id],
        FirstName: [party[0].FirstName, Validators.required],
        LastName: [party[0].LastName, Validators.required],
        Category: [party[0].Category, Validators.required],
        Address1: [party[0].Address1, Validators.required],
        Address2: [party[0].Address2, Validators.required],
        Phone: [party[0].Phone, Validators.required],
        IsActive: [party[0].IsActive? 1:0, Validators.required]
      });
    })
  }

  editParty(){
    this.party.updateParty(this.partyForm.value).pipe(take(1)).subscribe( ()=>{
      this.notify.showSuccess('Record updated successfully.', 'Success');
      this.navigate.navigate(['/master/party-list'])
    })
  }

  ngOnDestroy(){
    this.subspt.unsubscribe();
  }

}
