import type { Request } from 'express';

import type { IResponseError } from '.';

export const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponseError => ({
  statusCode,
  message,
  code,
  timestamp: new Date().toISOString(),
  path: request.url,
  method: request.method,
});
