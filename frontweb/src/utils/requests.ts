import axios from 'axios';
import { FilterData } from '../components/filter';

export const baseURL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

export const requestBackend = axios.create({
  baseURL
});

export const buildFilterParams = (
  filterData?: FilterData,
  extraParams?: Record<string, unknown>
) => {
  return {
    store: 0,
    ...extraParams
  };
};
