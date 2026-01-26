import { Module } from '@nestjs/common';
import { ActiviteService } from './activite.service';
import { ActiviteController } from './activite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activite } from './entities/activite.entity';
import { Rubrique } from 'src/rubrique/entities/rubrique.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activite,Rubrique,Auth])],
  controllers: [ActiviteController],
  providers: [ActiviteService],
})
export class ActiviteModule {}
