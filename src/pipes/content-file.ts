import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileUploadPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('File is required');
    }
    return value;
  }
}
