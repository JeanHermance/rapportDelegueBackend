import { Module } from '@nestjs/common';
import { PieceJointeService } from './piece-jointe.service';
import { PieceJointeController } from './piece-jointe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PieceJointe } from './entities/piece-jointe.entity';
import { Observation } from 'src/observation/entities/observation.entity';
import { CloudinaryService } from 'src/auth/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([PieceJointe,Observation])],
  controllers: [PieceJointeController],
  providers: [PieceJointeService,CloudinaryService],
})
export class PieceJointeModule {}
