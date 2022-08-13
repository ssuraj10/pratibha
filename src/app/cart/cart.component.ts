import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
// import print from "print-js";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  foods: any[] = [];
  tax = 0;
  subTotal = 0;
  total = 0;
  printtable  = true;
  constructor(private cartService: CartService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.foods = this.cartService.subject.subscribe(data => data)
    this.cartService.subject.subscribe((data: any) => {
      this.foods = data;
      // this.foods.push(data);
      this.calculations();
    });
    console.log(this.foods);

  }

  calculations() {
    this.subTotal = 0;
    for (let i = 0; i < this.foods.length; i++) {
      this.subTotal += this.foods[i].price * this.foods[i].set;
    }
    this.tax = this.subTotal * 0.10;
    this.total = this.subTotal + this.tax;
  }

  onDeleteItem(index: any) {
    this.foods[index].set = 1;
    this.cartService.removeCartItem(index);
    // this.foods.splice(index, 1);
    this.calculations();
  }

  incrementSets(index: any) {

    this.foods[index].set++;
    this.subTotal += Number(this.foods[index].price);
    this.tax = this.subTotal * 0.10;
    this.total = this.subTotal + this.tax;
 
    this.cd.detectChanges();
   
  }

  decrementSets(index: any) {
    console.log('hello dec');

   this.foods[index].set--;
    this.subTotal -= Number(this.foods[index].price);
    this.tax = this.subTotal * 0.10;
    this.total = this.subTotal + this.tax;
  }
  // ngOnDestroy() {
  //   this.subject.unsubscribe();
  // }

  print(){
    
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

          /* table */
          
          table { font-size: 75%; table-layout: fixed; width: 100%; }
          table { border-collapse: separate; border-spacing: 2px; }
          th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
          th, td { border-radius: 0.25em; border-style: solid; }
          th { background: #EEE; border-color: #BBB; }
          td { border-color: #DDD; }
          
          /* page */
          
          html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }
          html { background: #999; cursor: default; }
          
          body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }
          body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
          
          /* header */
          
          header { margin: 0 0 3em; }
          header:after { clear: both; content: ""; display: table; }
          
          header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
          header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
          header address p { margin: 0 0 0.25em; }
          header span, header img { display: block; float: right; }
          header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
          header img { max-height: 100%; max-width: 100%; }
          header input { cursor: pointer; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }
          
          /* article */
          
          article, article address, table.meta, table.inventory { margin: 0 0 3em; }
          article:after { clear: both; content: ""; display: table; }
          article h1 { clip: rect(0 0 0 0); position: absolute; }
          
          article address { float: left; font-size: 125%; font-weight: bold; }
          
          /* table meta & balance */
          
          table.meta, table.balance { float: right; width: 36%; }
          table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
          
          /* table meta */
          
          table.meta th { width: 40%; }
          table.meta td { width: 60%; }
          
          /* table items */
          
          table.inventory { clear: both; width: 100%; }
          table.inventory th { font-weight: bold; text-align: center; }
          
          table.inventory td:nth-child(1) { width: 26%; }
          table.inventory td:nth-child(2) { width: 38%; }
          table.inventory td:nth-child(3) { text-align: right; width: 12%; }
          table.inventory td:nth-child(4) { text-align: right; width: 12%; }
          table.inventory td:nth-child(5) { text-align: right; width: 12%; }
          
          /* table balance */
          
          table.balance th, table.balance td { width: 50%; }
          table.balance td { text-align: right; }
          
          /* aside */
          
          aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
          aside h1 { border-color: #999; border-bottom-style: solid; }
          
          /* javascript */
          
          .add, .cut
          {
            border-width: 1px;
            display: block;
            font-size: .8rem;
            padding: 0.25em 0.5em;	
            float: left;
            text-align: center;
            width: 0.6em;
          }
          
          .add, .cut
          {
            background: #9AF;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
            background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);
            background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);
            border-radius: 0.5em;
            border-color: #0076A3;
            color: #FFF;
            cursor: pointer;
            font-weight: bold;
            text-shadow: 0 -1px 2px rgba(0,0,0,0.333);
          }
          
          .add { margin: -2.5em 0 0; }
          
          .add:hover { background: #00ADEE; }
          
          .cut { opacity: 0; position: absolute; top: 0; left: -1.5em; }
          .cut { -webkit-transition: opacity 100ms ease-in; }
          
          tr:hover .cut { opacity: 1; }
          
       
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
