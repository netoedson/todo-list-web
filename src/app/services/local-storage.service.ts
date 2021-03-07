import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  store(key: string, value: any) {
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const value = localStorage.getItem(key);
    if (value === undefined) return;
    return JSON.parse(value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
