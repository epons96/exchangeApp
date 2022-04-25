export interface CurrencyList {
    currency: {};
    currencies: { [key: string]: string };
    status:     string;
}


export interface Conversion {
    base_currency_code: string;
    base_currency_name: string;
    amount:             string;
    updated_date:       Date;
    rates:              { [key: string]: Rate };
    status:             string;
}

export interface Rate {
    currency_name:   string;
    rate:            string;
    rate_for_amount: string;
}

