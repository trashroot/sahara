import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { PartyCategoryService } from 'src/app/services/party-category.service';
import { PartyService } from 'src/app/services/party.service';
import { IPartCatatory } from '../../part-category/party-category.interface';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit, OnDestroy {
  title = 'Add New Party';

  constructor(
    private fb: FormBuilder, 
    private partCat: PartyCategoryService,
    private party: PartyService,
    private notify: NotificationService,
    private router: Router
    ) { }

  partyForm = this.fb.group({
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
    let partCaySub = this.partCat.getPartyCategory().subscribe( categories => {
      this.partyCategories = <IPartCatatory[]>categories
    })
    this.subspt.add(partCaySub)
  }

  addParty(){    
    let parties = [];
    parties.push(this.partyForm.value);
    this.party.addParty(parties).pipe(take(1)).subscribe( ()=>{
      this.notify.showSuccess('Record added successfully.', 'Success');
      this.router.navigate(['/master/party-list'])
    })
  }

  ngOnDestroy(){
    this.subspt.unsubscribe();
  }

}
