import { Injectable } from '@angular/core';
import { Dessert } from '../../model/dessert.interface';
import Data from '../../../public/data.json';

@Injectable({
  providedIn: 'root',
})
export class MainLogicService {
  private desserts: Dessert[] = Data;
  private localStorageKey = 'cart';

  constructor() {
    const stored = localStorage.getItem(this.localStorageKey);
    if (stored) {
      this.desserts = JSON.parse(stored);
    } else {
      this.desserts = Data;
    }
    this.saveToLocalStorage();
  }

  getDesserts() {
    return this.desserts;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.desserts));
  }
}
