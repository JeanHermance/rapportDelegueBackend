import { Test, TestingModule } from '@nestjs/testing';
import { FokotanyService } from './fokotany.service';

describe('FokotanyService', () => {
  let service: FokotanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FokotanyService],
    }).compile();

    service = module.get<FokotanyService>(FokotanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
