// application
// import { ICurrency } from '~/interfaces/currency';

const dataShopCurrencies = [
    /*{
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
        rate: 0.92,
    },
    {
        code: 'GBP',
        symbol: '£',
        name: 'Pound Sterling',
        rate: 0.78,
    },*/
    {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        rate: 1/24500,
    },
    {
        code: 'VND',
        symbol: 'đ',
        name: 'VN Đồng',
        rate: 1,
    },
    /*{
        code: 'RUB',
        symbol: '₽',
        name: 'Russian Ruble',
        rate: 64,
    },*/
];

const dataShopDefaultCurrencyCode = 'VND';

export const dataShopDefaultCurrency = dataShopCurrencies.find((x) => (
    x.code === dataShopDefaultCurrencyCode
));

export default dataShopCurrencies;
