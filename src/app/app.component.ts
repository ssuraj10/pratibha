import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  visibleSidebar1;
  title = 'dinning-app';
  loader = true;
  ngOnInit(): void {
    
    //Loader variable set false after page load
   setTimeout(()=>{                           
     this.loader = false;
 }, 1000);
 }

}
