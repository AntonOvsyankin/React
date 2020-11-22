import * as moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const Routes = {
    ROOT: '/',
    HOTELS: '/list',
    TEST: '/test',
    ROOT_RESULT: '/s',
};

export const DEFAULT_NAVSTATE = {
    q: '',
    geo: '',
    adults: '2',
    rooms: '1',
    children: '0',
    checkin: moment().add(1, 'days').format(DATE_FORMAT),
    checkout: moment().add(4, 'days').format(DATE_FORMAT),
    currency: 'EUR',
};

export const DEFAULT_NAVSTATE_RESULTS = Object.assign(Object.assign({}, DEFAULT_NAVSTATE), {
    minPrice: '',
    maxPrice: '',
    sort: 'eqo',
    priceTotal: '1',
    eqo: '',
    star: ''
});