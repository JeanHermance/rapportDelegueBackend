import { Module } from '@nestjs/common';
import { CommuneService } from './commune.service';
import { CommuneController } from './commune.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commune } from './entities/commune.entity';
import { CloudinaryService } from 'src/auth/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commune])],
  controllers: [CommuneController],
  providers: [CommuneService,CloudinaryService],
})
export class CommuneModule {}
