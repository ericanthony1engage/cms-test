import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentRepository } from '../../repository/content.repository';

describe('ContentService', () => {
  let contentService: ContentService;

  const mockContentRepository = {
    checkContentPublicIdExists: jest.fn(),
    getContentByPublicId: jest.fn(),
    insertContent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: ContentRepository,
          useValue: mockContentRepository,
        },
      ],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(contentService).toBeDefined();
  });

  describe('getContent', () => {
    it('should return the file path if the ID exists', async () => {
      const id = 'valid-uuid';
      const filePath = 'uploads/sample.txt';
      mockContentRepository.checkContentPublicIdExists.mockResolvedValue(true);
      mockContentRepository.getContentByPublicId.mockResolvedValue({
        file: filePath,
      });

      const result = await contentService.getContent(id);

      expect(
        mockContentRepository.checkContentPublicIdExists,
      ).toHaveBeenCalledWith(id);
      expect(mockContentRepository.getContentByPublicId).toHaveBeenCalledWith(
        id,
      );
      expect(result).toEqual(filePath);
    });

    it('should throw BadRequestException if the ID does not exist', async () => {
      const id = 'invalid-uuid';
      mockContentRepository.checkContentPublicIdExists.mockResolvedValue(false);

      await expect(contentService.getContent(id)).rejects.toThrow(
        new BadRequestException('Id is not exist'),
      );
    });
  });

  describe('saveContent', () => {
    it('should save the file and return the ID', async () => {
      const file = 'sample.txt';
      const savedId = 'saved-uuid';
      mockContentRepository.insertContent.mockResolvedValue(savedId);

      const result = await contentService.saveContent(file);

      expect(mockContentRepository.insertContent).toHaveBeenCalledWith(
        `uploads/${file}`,
      );
      expect(result).toEqual(savedId);
    });
  });
});
