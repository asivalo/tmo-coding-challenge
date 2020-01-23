import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  startDate: Date;
  endDate: Date;
  currentDate: Date = new Date();
  quotes$: any;
  unsubscribe: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.stockPickerForm.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.startDate = this.stockPickerForm.get('startDate').value;
        this.fetchQuote();
      });
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, startDate, endDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, 'max'); //Always fetch all the data
      this.quotes$ = this.priceQuery.priceQueriesWithFilter(startDate, endDate);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
