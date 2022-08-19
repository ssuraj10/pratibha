import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  users: any;

  constructor(  private accounts: AccountService,) { }

  ngOnInit(): void {
    this.getalluser();
  }
  getalluser() {
    this.accounts.getAll().pipe(first()).subscribe(data => {

      this.users = data;
    });
  }

}
