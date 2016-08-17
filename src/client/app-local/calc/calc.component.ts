// ```
// calc-details.component.js
// (c) 2016 Codename: Steeve Knight
// CNSKnight@dharmiWeb.net
// ```

import {
  Component,
  OnInit,
  OnChanges,
  Input,
  //  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { CalculatorI } from './services/calc.store';
import { CalculatorService } from './services/calc.service';

// # CalcDisplay Component
@Component({
  selector: 'calc-disp',
  template: '{{calcR.display}}'
})

class CalcDisplayComponent {
  @Input() calcR: CalculatorI;
}

// # Calculator Component
@Component({
  moduleId: module.id,
  selector: 'calc-comp',
  viewProviders: [CalculatorService],
  templateUrl: 'calc.html',
  directives: [CalcDisplayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calc.component.css'],
  encapsulation: ViewEncapsulation.None
})
// snippets: https://marketplace.visualstudio.com/items?itemName=johnpapa.@angular
export class CalculatorComponent implements OnInit, OnChanges {
  calcR: Observable<CalculatorI>;
  currentDisplay: string;

  constructor(private calcService: CalculatorService,
    private store: Store<any>, private cdr: ChangeDetectorRef) {

    // pick up the observable defined on the service
    this.calcR = calcService.calcR;
  }

  ngOnInit() {
    return;
  }

  ngOnChanges(changed: any) {
    return;
  }

  onButtonClick(event: any) {
    let attrs = Array.prototype.slice.call(event.target.attributes);
    attrs.forEach((item:any, idx:number) => {
      switch (item.name) {
        case 'data-action':
          switch (item.value) {
            case 'AC':
              this.calcService.clearAll();
              break;
            case 'CE':
              this.calcService.clearEntered();
              break;
            case 'calc':
              this.calcService.calculate();
              break;
          }
          break;
        case 'data-oper':
          this.calcService.setOperator(item.value);
          break;
        case 'data-digit':
          this.calcService.addDigit(item.value);
          break;
      }
    });
  }
}
