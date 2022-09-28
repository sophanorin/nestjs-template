import { Controller, Post, UploadedFiles } from '@nestjs/common';
import { ApiFileFields } from 'src/common/decorators/api-file-fields.decorator';
import { ApiFile } from 'src/common/decorators/api-files.decorator';
// import { fileMimetypeFilter } from 'src/common/filters/file-mimetype.filter';
import { S3Service } from '../providers/s3.service';
import { ParseFile } from 'src/common/pipes/parse-file.pipe';
// import { fileMimetypeFilter } from 'src/common/filters/file-mimetype.filter';

/**
 * AWS S3 Bucket
 */
@Controller('s3')
export class S3BucketController {
  constructor(private s3: S3Service) {}

  @Post('upload')
  // @ApiFile('file', true, 1, { fileFilter: fileMimetypeFilter('image') })
  // @ApiImageFile('file', true)
  @ApiFile('files', true, 2)
  uploadFiles(@UploadedFiles(ParseFile) files: Array<Express.Multer.File>) {
    return this.s3.uploadMultipleFiles(files);
  }

  @Post('uploadFields')
  @ApiFileFields([
    { name: 'avatar', maxCount: 1, required: true },
    { name: 'background', maxCount: 1 },
  ])
  uploadMultipleFiles(@UploadedFiles(ParseFile) files: Express.Multer.File[]) {
    return files;
  }
}
