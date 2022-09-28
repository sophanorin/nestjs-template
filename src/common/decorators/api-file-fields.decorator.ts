import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import type { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type UploadFields = MulterField & { required?: boolean };

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiFileFields(uploadFields: UploadFields[], localOptions?: MulterOptions): ReturnType<typeof applyDecorators> {
  const bodyProperties: Record<string, SchemaObject | ReferenceObject> = Object.assign(
    {},
    ...uploadFields.map((field: UploadFields) => ({ [field.name]: { type: 'string', format: 'binary' } })),
  );
  const apiBody = ApiBody({
    schema: {
      type: 'object',
      properties: bodyProperties,
      required: uploadFields.filter((f: UploadFields) => f.required).map((f: UploadFields) => f.name),
    },
  });

  return applyDecorators(UseInterceptors(FileFieldsInterceptor(uploadFields, localOptions)), ApiConsumes('multipart/form-data'), apiBody);
}
