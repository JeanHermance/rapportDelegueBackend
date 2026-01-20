import { Test, TestingModule } from '@nestjs/testing';
import { FokotanyController } from './fokotany.controller';
import { FokotanyService } from './fokotany.service';

describe('FokotanyController', () => {
  let controller: FokotanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FokotanyController],
      providers: [FokotanyService],
    }).compile();

    controller = module.get<FokotanyController>(FokotanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
