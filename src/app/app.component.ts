import { Component } from '@angular/core';

import { NzCascaderOption } from 'ng-zorro-antd/cascader';

import {SearchModalService} from './servicios/search-modal.service';

// MOCK: Cambiar por llamada a API
var brands = [
    {
      value: 'ford',
      label: 'Ford'
    },
    {
      value: 'mazda',
      label: 'Mazda'
    },
    {
      value: 'chevrolet',
      label: 'Chevrolet'
    },
    {
      value: 'volkswagen',
      label: 'Volkswagen'
    }
  ],
  models = [
    {
      value: 'deville',
      label: 'Deville'
    },
    {
      value: 'venture',
      label: 'Venture'
    },
    {
      value: 'voyager',
      label: 'Voyager'
    },
    {
      value: 'cougar',
      label: 'Cougar'
    }
  ],
  years =  [
    {
      value: '2011',
      label: '2011'
    },
    {
      value: '2010',
      label: '2010'
    },
    {
      value: '2014',
      label: '2014'
    },
    {
      value: '2013',
      label: '2013'
    }
  ],
  variants = [
    {
      value: 'sport',
      label: 'Sport',
      isLeaf: true
    },
    {
      value: 'grand-touring',
      label: 'Grand Touring',
      isLeaf: true
    },
    {
      value: 'trendline',
      label: 'Trendline',
      isLeaf: true
    },
    {
      value: 'wolfsburg-edition',
      label: 'Wolfsburg Edition',
      isLeaf: true
    }
  ],
  widths = [
    {
      value: '10',
      label: '10'
    },
    {
      value: '125',
      label: '125'
    },
    {
      value: '185',
      label: '185'
    },
    {
      value: '205',
      label: '205'
    }
  ],
  heights = [
    {
      value: '45',
      label: '45'
    },
    {
      value: '65',
      label: '65'
    },
    {
      value: '70',
      label: '70'
    },
    {
      value: '80',
      label: '80'
    }
  ],
  rins = [
    {
      value: 'r13',
      label: 'R13',
      isLeaf: true
    },
    {
      value: 'r14',
      label: 'R14',
      isLeaf: true
    },
    {
      value: 'r15',
      label: 'R15',
      isLeaf: true
    },
    {
      value: 'r17',
      label: 'R17',
      isLeaf: true
    }
  ];

const CAR_OPTIONS = brands.map(function (brand_item) {
  brand_item['children'] = models.map(function (model_item) {
    model_item['children'] = years.map(function (year_item) {
      year_item['children'] = variants;
      return year_item;
    });
    return model_item;
  });
  return brand_item;
})

const SIZE_OPTIONS = widths.map(function (width_item) {
  width_item['children'] = heights.map(function (height_item) {
    height_item['children'] = rins;
    return height_item;
  });
  return width_item;
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TiendaEnLinea';
  byCarCascaderOptions: NzCascaderOption[];
  bySizeCascaderOptions: NzCascaderOption[];
  byCarCascaderValue: any[] | null;
  bySizeCascaderValue: any[] | null;

  constructor(public _modalService: SearchModalService) {
    this.getCarCascaderOptions();
    this.getSizeCascaderOptions();
  }

  getCarCascaderOptions() {
    this.byCarCascaderOptions = CAR_OPTIONS;
  }

  getSizeCascaderOptions() {
    this.bySizeCascaderOptions = SIZE_OPTIONS;
  }

  onCarChanges(values: any): void {
    console.log(values);
  }

  onSizeChanges(values: any): void {
    console.log(values);
  }
}
