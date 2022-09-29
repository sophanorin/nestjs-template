import { BadRequestException } from '@nestjs/common';

// dto fields validation
export class BodyException extends BadRequestException {
    constructor(public validationErrors: any) {
        super();
    }
}
