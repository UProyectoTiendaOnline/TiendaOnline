import { Injectable } from '@angular/core';

@Injectable()
export class SearchModalService {
  showByCarModal = false;
  showBySizeModal = false;

  constructor() { }

  toggleByCarModal() {
    this.showByCarModal = !this.showByCarModal;
  }

  toggleBySizeModal() {
    this.showBySizeModal = !this.showBySizeModal;
  }
}
