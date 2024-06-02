import { Module } from '@nestjs/common';
import { ContentController } from '../../controller/content/content.controller';
import { ContentService } from '../../services/content/content.service';
import { ContentRepository } from '../../repository/content.repository';

@Module({
  controllers: [ContentController],
  providers: [ContentService, ContentRepository],
})
export class ContentModule {}
