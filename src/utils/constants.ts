interface IConstants {
    API_FETCHER_LIB: 'axios' | 'fetch';
    API_BASE_URL: string;
    APP_NAME: string;
    APP_MINIMUM_CASHOUT_AMOUNT: number;
}

export const CONSTANTS: IConstants = {
    API_FETCHER_LIB:
        process.env.NEXT_PUBLIC_USE_AXIOS_FETCHER == 'true' ? 'axios' : 'fetch',
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '',
    APP_MINIMUM_CASHOUT_AMOUNT:
        Number(process.env.NEXT_PUBLIC_APP_MINIMUM_CASHOUT_AMOUNT) || 500,
};
