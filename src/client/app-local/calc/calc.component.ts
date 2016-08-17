// ```
// calc-details.component.js
// (c) 2016 Codename: Steeve Knight
// CNSKnight@dharmiWeb.net
// ```

// # CalcDisplay Component
// # Calculator Component
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

@Component({
  selector: 'calc-disp',
  template: '{{calcR.display}}'
})

class CalcDisplay {
  @Input() calcR: CalculatorI;
}

@Component({
  moduleId: module.id,
  selector: 'calculator',
  viewProviders: [CalculatorService],
  templateUrl: 'calc.html',
  directives: [CalcDisplay],
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
    // -NO- this will create a new observer
    // bind to our observable as needed
    // this.calcR.subscribe((state: CalculatorI) => {
    //   this.currentDisplay = state.display;
    //   console.log('Displaying: '+this.currentDisplay);
    // });

    this.calcService.initializeStore();
  }

  ngOnChanges(changed: any) {
    return;
  }

  allClear() {
    this.calcService.clearAll();
  }

  clearEntry() {
    this.calcService.clearEntered();
  }

  addDigit(event: any) {
    this.calcService.addDigit(event.target.getAttribute('data-value'));
  }

  setOperator(event: any) {
    this.calcService.setOperator(event.target.getAttribute('data-value'));
  }

  doCalc() {
    this.calcService.calculate();
  }
}
