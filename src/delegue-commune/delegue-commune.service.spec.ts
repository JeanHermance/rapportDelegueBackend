import { Test, TestingModule } from '@nestjs/testing';
import { DelegueCommuneService } from './delegue-commune.service';

describe('DelegueCommuneService', () => {
  let service: DelegueCommuneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DelegueCommuneService],
    }).compile();

    service = module.get<DelegueCommuneService>(DelegueCommuneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
