import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommuneModule } from './commune/commune.module';
import { FokotanyModule } from './fokotany/fokotany.module';
import { DelegueCommuneModule } from './delegue-commune/delegue-commune.module';
import { RubriqueModule } from './rubrique/rubrique.module';
import { ActiviteModule } from './activite/activite.module';
import { ObservationModule } from './observation/observation.module';
import { PieceJointeModule } from './piece-jointe/piece-jointe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        }
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CommuneModule,
    FokotanyModule,
    DelegueCommuneModule,
    RubriqueModule,
    ActiviteModule,
    ObservationModule,
    PieceJointeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
