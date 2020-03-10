import { Component, OnInit } from '@angular/core';

import {SearchModalService} from '../../servicios/search-modal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  host: {
      class: 'content-wrapper'
  }
})
export class HomePageComponent implements OnInit {

  constructor(
    public _modalService: SearchModalService
  ) { }

  ngOnInit() {
  }

}
