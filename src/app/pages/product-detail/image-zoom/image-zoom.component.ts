import { Component, OnInit, Input, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css']
})
export class ImageZoomComponent implements OnInit {

  ngOnInit(): void {
    
  }
  @Input('img') imagen: string;
  @Input() zoom=5;
  @Input() lenSize=10;
  @Input() imgWidth:any;
  @Input() imgHeigth:any;
  @Input() divZoomed:ElementRef
  
  posX:number=0;
  posY:number=0;
  cx:number=1;
  cy:number=1;
  yet:boolean=false;
  factorX:number;
  factorY:number;

  
  private mouseMovement = new Subject();

  @ViewChild('img',{static:false,read:ElementRef}) img
  @ViewChild('len',{static:false,read:ElementRef}) lens
  @HostListener('mousemove',['$event'])
  mouseMove(event:any)
  {
    const result=this.moveLens(event);
    this.render.setStyle(this.divZoomed,'background-position',result)
  }

  constructor(private render:Renderer2){}
  ngAfterViewInit(){
    
  }
  onLoad()
  {
   
    this.render.setStyle(this.divZoomed,'background-image',"url('" + this.imagen+ "')");
    this.render.setStyle(this.divZoomed,'background-size',(this.img.nativeElement.width * this.zoom) + "px " + (this.img.nativeElement.height * this.zoom) + "px")
   
    this.render.setStyle(this.divZoomed,'background-repeat', 'no-repeat')
    this.render.setStyle(this.divZoomed,'transition','background-position .2s ease-out');
    this.factorX=this.img.nativeElement.width;
    this.factorY=this.img.nativeElement.height;

     this.yet=true;
     setTimeout(()=>{
        this.factorX=this.imgWidth || this.imgHeigth?this.factorX/this.img.nativeElement.width:1
        this.factorY=this.imgWidth || this.imgHeigth?this.factorY/this.img.nativeElement.height:1
    const dim=(this.divZoomed as any).getBoundingClientRect()
    this.cx=(dim.width-this.img.nativeElement.width*this.zoom*this.factorX)/(this.img.nativeElement.width - this.lens.nativeElement.offsetWidth);
    this.cy=(dim.height-this.img.nativeElement.height*this.zoom*this.factorY)/(this.img.nativeElement.height -
     this.lens.nativeElement.offsetHeight);
         


     })


  }
  moveLens(e:any)
  {
    let pos
    let x
    let y;
    
    e.preventDefault();
   
    pos = this.getCursorPos(e);
    
    x = pos.x - (this.lens.nativeElement.offsetWidth / 2);
    y = pos.y - (this.lens.nativeElement.offsetHeight / 2);
  
    if (x > this.img.nativeElement.width - this.lens.nativeElement.offsetWidth) {x = this.img.nativeElement.width - this.lens.nativeElement.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > this.img.nativeElement.height - this.lens.nativeElement.offsetHeight) {y = this.img.nativeElement.height - this.lens.nativeElement.offsetHeight;}
    if (y < 0) {y = 0;}
   
    this.posX = x;
    this.posY = y;
  

    let result = (x * this.cx) + "px "+(y * this.cy) + "px"

    return result;


  }
  getCursorPos(e) {
    let a, x = 0, y = 0;
    e = e || window.event;
    
    a = this.img.nativeElement.getBoundingClientRect();
   
    x = e.pageX - a.left;
    y = e.pageY - a.top;
   
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }

}
