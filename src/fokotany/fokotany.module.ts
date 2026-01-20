import { Module } from '@nestjs/common';
import { FokotanyService } from './fokotany.service';
import { FokotanyController } from './fokotany.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fokotany } from './entities/fokotany.entity';
import { Commune } from 'src/commune/entities/commune.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fokotany,Commune])],
  controllers: [FokotanyController],
  providers: [FokotanyService],
})
export class FokotanyModule {}
