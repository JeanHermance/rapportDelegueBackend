import { Test, TestingModule } from '@nestjs/testing';
import { DelegueCommuneController } from './delegue-commune.controller';
import { DelegueCommuneService } from './delegue-commune.service';

describe('DelegueCommuneController', () => {
  let controller: DelegueCommuneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelegueCommuneController],
      providers: [DelegueCommuneService],
    }).compile();

    controller = module.get<DelegueCommuneController>(DelegueCommuneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
