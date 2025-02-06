import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (e) {
      console.error('Error getting from local storage', e);
      return null;
    }
  }

  remove(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const localStorageItem = localStorage.getItem(key);
      if (localStorageItem) {
        resolve(localStorage.removeItem(key));
      } else {
        reject(() => console.error('Error getting from local storage'));
      }
    });
  }
}
