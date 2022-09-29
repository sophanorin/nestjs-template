/* eslint-disable @typescript-eslint/naming-convention */
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

import { fileMimetypeFilter } from '../filters/file-mimetype.filter';

export function ApiFile(
    fieldName: string = 'files',
    required: boolean = false,
    maxCount: number = 10,
    localOptions?: MulterOptions,
): ReturnType<typeof applyDecorators> {
    return applyDecorators(
        UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions)),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                required: required ? [fieldName] : [],
                properties: {
                    [fieldName]: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
        }),
    );
}

export function ApiImageFile(fileName: string = 'image', required: boolean = false): ReturnType<typeof ApiFile> {
    return ApiFile(fileName, required, 10, {
        fileFilter: fileMimetypeFilter('image'),
    });
}

export function ApiPdfFile(fileName: string = 'document', required: boolean = false): ReturnType<typeof ApiFile> {
    return ApiFile(fileName, required, 10, {
        fileFilter: fileMimetypeFilter('pdf'),
    });
}
