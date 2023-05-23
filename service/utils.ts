import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const isRequestFailed = (
    result: any
): result is {
    error: FetchBaseQueryError | SerializedError;
} => result.hasOwnProperty('error');
export const isRequestSuccess = (
    result: any
): result is {
    data: any;
} => result.hasOwnProperty('data');

export const getHash = (obj: Object | Array<any>): number => {
    let hash = 0;
    let str = String(JSON.stringify(obj));
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
