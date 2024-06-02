import { Test, TestingModule } from '@nestjs/testing';
import { ContentRepository } from './content.repository';
import { KnexModule } from 'nestjs-knex';
import { Knex } from 'knex';
import { ValueProvider } from '@nestjs/common';

// Mocking Knex instance
const mockKnex = {
  raw: jest.fn(),
  first: jest.fn(),
  insert: jest.fn(),
  where: jest.fn(),
};

const mockKnexProvider: ValueProvider<Knex> = {
  provide: 'default_KnexModuleConnectionToken',
  useValue: mockKnex as unknown as Knex,
};

describe('ContentRepository', () => {
  let repository: ContentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KnexModule],
      providers: [ContentRepository, mockKnexProvider],
    }).compile();

    repository = module.get<ContentRepository>(ContentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getContentByPublicId', () => {
    it('should retrieve content by public id', async () => {
      const mockContent = { public_id: 'test_public_id', file: 'test_file' };
      mockKnex.first.mockResolvedValue(mockContent);

      const result = await repository.getContentByPublicId('test_public_id');

      expect(result).toEqual(mockContent);
      expect(mockKnex.where).toBeCalledWith({ public_id: 'test_public_id' });
    });
  });

  describe('insertContent', () => {
    it('should insert content and return public id', async () => {
      const mockPublicId = 'mock_public_id';
      mockKnex.insert.mockResolvedValue([{ public_id: mockPublicId }]);

      const result = await repository.insertContent('test_file');

      expect(result).toBe(mockPublicId);
      expect(mockKnex.insert).toBeCalledWith(
        { file: 'test_file' },
        'public_id',
      );
    });
  });
});
