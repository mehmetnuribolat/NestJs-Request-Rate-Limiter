import { HttpException, HttpStatus } from '@nestjs/common';
import { milisecondToMin } from '../helpers/converters/time-helper.converter';

export class CustomRateLimitError extends HttpException {
  constructor(totalLimit: number, remainingTimeForNextRequest_ms: number) {
    super(
      {
        status: HttpStatus.TOO_MANY_REQUESTS,
        error:
          `You have exceeded the request limit of ${totalLimit} requests per hour. ` +
          `Try Again after ${milisecondToMin(
            remainingTimeForNextRequest_ms,
          )} min.`,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
