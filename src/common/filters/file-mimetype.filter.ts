import { UnsupportedMediaTypeException } from '@nestjs/common';

export function fileMimetypeFilter(
    ...mimetypes: string[]
): (_req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void {
    return (_req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        if (mimetypes.some((m: string) => file.mimetype.includes(m))) {
            callback(null, true);
        } else {
            callback(new UnsupportedMediaTypeException(`File type is not matching: ${mimetypes.join(', ')}`), false);
        }
    };
}
