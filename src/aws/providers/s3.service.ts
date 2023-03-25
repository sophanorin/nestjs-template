import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import type { PutObjectRequest } from 'aws-sdk/clients/s3';

import { AwsService } from '../aws.service';

const BUCKET_NAME = 'rsnjtest';

/**
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
 */
@Injectable()
export class S3Service {
    private s3: S3 = new S3(this.aws.options);

    constructor(private aws: AwsService) {}

    public async uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<any[]> {
        return Promise.all(files.map(async (file: Express.Multer.File) => this.upload(file)));
    }

    public async upload(file: Express.Multer.File): Promise<any> {
        const { originalname } = file;
        return this.uploadS3(file.buffer, BUCKET_NAME, originalname);
    }

    public async uploadS3(file: Buffer, bucket: string, name: string): Promise<any> {
        const params: PutObjectRequest = {
            ACL    : 'public-read',
            Bucket : bucket,
            Key    : String(name),
            Body   : file,
        };
        return new Promise((resolve: (v: unknown) => void, reject: (r: any) => void) => {
            this.s3.upload(params, (err: { message: any }, data: unknown) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
}
