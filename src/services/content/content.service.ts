import { BadRequestException, Injectable } from '@nestjs/common';
import { ContentRepository } from '../../repository/content.repository';

@Injectable()
export class ContentService {
  constructor(private contentRepository: ContentRepository) {}

  public getContent = async (id: string): Promise<string> => {
    if (!(await this.contentRepository.checkContentPublicIdExists(id))) {
      throw new BadRequestException('Id is not exist');
    }
    const { file } = await this.contentRepository.getContentByPublicId(id);

    return file;
  };

  public saveContent = async (file: string) => {
    return await this.contentRepository.insertContent(`uploads/${file}`);
  };
}
