import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export const apiRequest = axios.create({
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
});


export interface IResponse<T> {
  data: T;
}