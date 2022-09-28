import type { long } from 'aws-sdk/clients/cloudfront';

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: long;
}

export interface FilesPayload {
  files: File[];
}
