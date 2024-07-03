import { createParamDecorator } from '@nestjs/common';

export const GetRequestId = createParamDecorator((data, req): string => {
  const incomingMessage = req?.args?.[0];
  return incomingMessage?.locals?.requestId || 'REQUEST_ID_DECORATOR_ERR';
});
