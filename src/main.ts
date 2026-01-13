import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('servicedelegue');

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Service des Delegué API')
    .setDescription('rapport des activité des delegue')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    useGlobalPrefix: true,
    swaggerOptions: {
      persistAuthorization: true,
      customSiteTitle: 'Service des Delegué API',
    },
  });

  app.getHttpAdapter().get('/servicedelegue/doc-json', (req: any, res: any) => {
    res.json(document)
  })

  // Redirect root to Swagger
  app.getHttpAdapter().get('/', (req: any, res: any) => {
    res.redirect('/servicedelegue/api');
  });

  // Only call listen if not running as a serverless function
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
  }

  await app.init();
  return app.getHttpAdapter().getInstance();
}

// Export the bootstrap function as the handler for Vercel
let cachedHandler: any;

export default async (req: any, res: any) => {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req, res);
};
