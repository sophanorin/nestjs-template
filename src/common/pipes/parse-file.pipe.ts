import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFile implements PipeTransform {
    public transform(
        files: Express.Multer.File | Express.Multer.File[],
    ): Express.Multer.File | Express.Multer.File[] {
        if (files === undefined || files === null) {
            throw new BadRequestException('Validation failed (Reason: Missing file fields)');
        }

        if (Array.isArray(files) && files.length === 0) {
            throw new BadRequestException('Validation failed (Reason: File field could not empty)');
        }

        return files;
    }
}
