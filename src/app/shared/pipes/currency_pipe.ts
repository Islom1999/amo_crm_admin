import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, currencyCode: string = 'UZS', display: string = 'symbol', digitsInfo: string = '1.2-2', locale: string = 'tr'): any {
    const formattedValue = this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
    return `${formattedValue.replace('UZS', '').trim()} UZS`;
  }
}
