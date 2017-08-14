import { get } from '../get'

export function getAdData() {
    const result = get('/api/homead');
    return result;
}

export function getListData(city, page) {
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page);
    return result;
}

export function getSearchData(category, keyword) {
    const result = get('/api/search/' + encodeURIComponent(category) + '/' + keyword);
    return result;
}