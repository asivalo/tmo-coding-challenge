import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  const fetchQuoteMock: jest.Mock<any> = jest.fn(() => of({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        StoreModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: PriceQueryFacade,
          useValue: {
            fetchQuote: fetchQuoteMock
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchQuote when fetchQuote() is invoked', () => {
    component.ngOnInit();
    component.stockPickerForm.controls['symbol'].setValue('AAPL');
    component.stockPickerForm.controls['period'].setValue('5y');
    component.fetchQuote();
    expect(fetchQuoteMock).toHaveBeenCalled();
  });
});
