import { StandardRestApiError } from './standard.rest.api.error';
import { RestApiError } from './rest.api.error';

export class ErrorIf {
  public static isEmpty<T>(
    value: T | undefined | null,
    error: StandardRestApiError,
  ): T {
    if (value === null || value === undefined) {
      throw RestApiError.createHttpException(error);
    }

    return value;
  }
}
