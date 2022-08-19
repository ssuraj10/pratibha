import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {
  public appColor: '#DC143C';
  private appImage: '';
  private appTitle: 'KoshiKart';
  private appDescription: 'E-commerce';
  constructor(private meta: Meta, private title: Title) {}
  public setMetaData(config){     
    const description = config.description || this.appDescription;    
    const image = config.image || this.appImage;     
    const title = config.title     
      ? `${config.title}`     
      : this.appTitle;          
      this.title.setTitle(title) 
      const tags = [
        { name: 'description', content: description },
        { name: 'theme-color', content: this.appColor },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: image },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: title },
        { name: 'apple-touch-startup-image', content: image },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
      ];
      tags.forEach(tag => this.meta.updateTag(tag));
    

  }

  // public getmetatag(config){
  //   const description = config.description || this.appDescription;    
  //   const image = config.image || this.appImage;     
  //   const title = config.title 
  //   ? `${config.title}`     
  //   : this.appTitle;  
  //   this.title.getTitle()
  //   const tags = [
  //     { property: 'og:title', content: title },
  //     { property: 'og:description', content: description },
  //     { property: 'og:image', content: image },
  //   ];
  //   tags.forEach(tag => this.meta.getTags('property=og:title'));


  // }

    
}
