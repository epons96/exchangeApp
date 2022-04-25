import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rate } from './currency.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'exchangeApp';

  currencies: string[] = [];

  forma!: FormGroup;

  currencyActual!: string;
  currencyActual2!: string;
  cosa!: Rate[];

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.currencyService.getCurrencyList().subscribe((resp) => {
      this.currencies = Object.keys(resp.currencies);
    });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      currency: ['', Validators.required],
      amount: ['', Validators.required],
      currency2: ['', Validators.required],
      amount2: [''],
    });
  }

  // CONVERSION

  conversion() {
    if (
      this.forma.get('currency')?.value &&
      this.forma.get('currency2')?.value &&
      this.forma.get('amount')?.value
    ) {
      this.currencyService
        .getCurrencyConversion(
          this.forma.get('currency')?.value,
          this.forma.get('currency2')?.value,
          this.forma.get('amount')?.value
        )
        .subscribe((resp) => {
          Object.keys(resp.rates).forEach((element) => {
            if ((element = this.forma.get('currency2')?.value)) {
              this.cosa = Object.values<Rate>(resp.rates);
              this.forma.get('amount2')?.setValue(this.cosa[0].rate_for_amount);
            }
          });
        });
    }

  }

  // SWAP VALUES

  swap() {
    if (
      this.forma.get('currency')?.value &&
      this.forma.get('currency2')?.value
    ) {
      this.currencyActual = this.forma.get('currency')?.value;
      this.forma.get('currency')?.setValue(this.forma.get('currency2')?.value);
      this.forma.get('currency2')?.setValue(this.currencyActual);
    } else {
      return;
    }
  }
}
