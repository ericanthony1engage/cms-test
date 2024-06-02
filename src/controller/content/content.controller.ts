import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ContentService } from '../../services/content/content.service';
import ResponseUtil from '../../utils/response.util';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterContentOptions } from '../../middleware/multer.middleware';
import { FileUploadPipe } from '../../pipes/content-file';
import { join } from 'path';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const file = await this.contentService.getContent(id);
    res.sendFile(join(__dirname, '../../../', file));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', MulterContentOptions))
  @HttpCode(HttpStatus.OK)
  async upload(
    @UploadedFile(new FileUploadPipe())
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('File is missing', HttpStatus.BAD_REQUEST);
    }

    const { filename } = file;

    const id = await this.contentService.saveContent(filename);

    new ResponseUtil(res)
      .setData({
        id,
      })
      .send();
  }
}
