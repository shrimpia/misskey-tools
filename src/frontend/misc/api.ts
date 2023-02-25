import { API_ENDPOINT, LOCALSTORAGE_KEY_TOKEN } from '../const';

export type ApiOptions = Record<string, any>;

const getHeaders = (token?: string) => {
  const _token = token ?? localStorage.getItem(LOCALSTORAGE_KEY_TOKEN);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (_token) {
    headers['Authorization'] = `Bearer ${_token}`;
  }
  return headers;
};

const getResponse = <T>(r: Response) => r.status === 204 ? null : r.json() as unknown as T;

export const $get = <T = any>(endpoint: string, token?: string): Promise<T | null> => {
  return fetch(API_ENDPOINT + endpoint, {
    method: 'GET',
    headers: getHeaders(token),
  }).then(r => getResponse<T>(r));
};


export const $put = <T = any>(endpoint: string, opts: ApiOptions = {}, token?: string): Promise<T | null> => {
  return fetch(API_ENDPOINT + endpoint, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(opts),
  }).then(r => getResponse<T>(r));
};


export const $post = <T = any>(endpoint: string, opts: ApiOptions = {}, token?: string): Promise<T | null> => {
  return fetch(API_ENDPOINT + endpoint, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(opts),
  }).then(r => getResponse<T>(r));
};

export const $delete = <T = any>(endpoint: string, opts: ApiOptions = {}, token?: string): Promise<T | null> => {
  return fetch(API_ENDPOINT + endpoint, {
    method: 'DELETE',
    headers: getHeaders(token),
    body: JSON.stringify(opts),
  }).then(r => getResponse<T>(r));
};
