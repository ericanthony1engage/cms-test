import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from '../../services/content/content.service';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ContentController', () => {
  let contentController: ContentController;

  const mockContentService = {
    getContent: jest.fn(),
    saveContent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compile();

    contentController = module.get<ContentController>(ContentController);
  });

  it('should be defined', () => {
    expect(contentController).toBeDefined();
  });

  describe('get', () => {
    it('should return a file path', async () => {
      const filePath = 'uploads/sample.txt';
      mockContentService.getContent.mockResolvedValue(filePath);

      const res = {
        sendFile: jest.fn(),
      } as unknown as Response;

      const id = 'valid-uuid';

      await contentController.get(id, res);

      expect(mockContentService.getContent).toHaveBeenCalledWith(id);
      expect(res.sendFile).toHaveBeenCalledWith(
        expect.stringContaining(filePath),
      );
    });
  });

  describe('upload', () => {
    it('should save a file and return its id', async () => {
      const file = {
        filename: 'sample.txt',
      } as Express.Multer.File;

      const savedId = 'saved-uuid';
      mockContentService.saveContent.mockResolvedValue(savedId);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await contentController.upload(file, res);

      expect(mockContentService.saveContent).toHaveBeenCalledWith(
        file.filename,
      );
      expect(res.json).toHaveBeenCalledWith({
        data: {
          id: savedId,
        },
        error: {},
        message: 'OK',
      });
    });

    it('should throw an exception if file is missing', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(contentController.upload(null, res)).rejects.toThrow(
        new HttpException('File is missing', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
