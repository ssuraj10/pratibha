import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchproductService {

  constructor() {}

  set(key: string, data: any): void {
    var a = [];
    try {
      a = JSON.parse(localStorage.getItem(key));
      if(a.length) {
        console.log(a);
        a.push(data);
        localStorage.setItem(key, JSON.stringify(a));
      } else {
        a = [];
        a.push(data);
        localStorage.setItem(key, JSON.stringify(a));
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
