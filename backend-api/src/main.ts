import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './core/filters/http-exception.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

/*------------------------------------------------
  @ BY PADAM THAPA
 -------------------------------------------------                                                  
*/

//Main bootstrap function
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }); 
  app.setViewEngine('ejs');

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(__dirname, 'views'));

  app.setGlobalPrefix('api/v1');


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());



  const config = new DocumentBuilder() 
    .setTitle('Task Management APi Service')
    .setDescription('Task Management APi  documentation')
    .setExternalDoc('Task Management Documentation', 'docs/')
    .addSecurityRequirements('JWT-auth')
    .setTermsOfService('/Terms')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'JWT Authorization',
      in: 'header',
    }, "JWT-auth")
    .build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api/docs', app, document,{
    jsonDocumentUrl: "api/docs/json",
  });
  await app.listen(3002);
}
bootstrap();
