import { api } from '@/lib/api';
import type { LoginValues, RegisterValues } from './auth.schema';

export interface Me {
  sub: string;
  organizationId: string;
  role: string;
}

export function registerUser(values: RegisterValues) {
  return api('/auth/register', { method: 'POST', body: JSON.stringify(values) });
}

export function loginUser(values: LoginValues) {
  return api('/auth/login', { method: 'POST', body: JSON.stringify(values) });
}

export function logoutUser() {
  return api('/auth/logout', { method: 'POST' });
}

export function fetchMe() {
  return api<Me>('/auth/me');
}
