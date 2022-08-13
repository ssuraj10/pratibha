import { Component, OnInit } from '@angular/core';
import { LOGO } from '../shared/constant/url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 LOGO = LOGO
  constructor() { }

  ngOnInit(): void {
  }

}
