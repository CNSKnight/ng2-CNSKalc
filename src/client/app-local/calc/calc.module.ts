import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from './services/calc.service';
import { CalculatorComponent } from './calc.component';
import { calculatorReducer } from './services/calc.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.provideStore({ calculatorR: calculatorReducer }, { stack: [], display: '0' })
    ],
    declarations: [CalculatorComponent],
    exports: [CalculatorComponent],
    providers: [CalculatorService]
})

export class CalcModule {}
