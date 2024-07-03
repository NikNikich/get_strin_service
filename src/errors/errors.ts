import { StandardRestApiError } from './standard.rest.api.error';

export const NOT_STRING: StandardRestApiError = StandardRestApiError.create(
  1001,
  'Not find string',
);
