import { Module } from '@nestjs/common';
import { DelegueCommuneService } from './delegue-commune.service';
import { DelegueCommuneController } from './delegue-commune.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelegueCommune } from './entities/delegue-commune.entity';
import { Commune } from 'src/commune/entities/commune.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DelegueCommune,Commune,Auth])],
  controllers: [DelegueCommuneController],
  providers: [DelegueCommuneService],
})
export class DelegueCommuneModule {}
