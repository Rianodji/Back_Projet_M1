import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Ajout du pipe de validation global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // Supprimer les propriétés qui ne sont pas dans le DTO
    forbidNonWhitelisted: true,  // Lancer une exception si des propriétés inconnues sont présentes
    transform: true,  // Transformer les types si nécessaire (par exemple, convertir une chaîne en nombre)
  }));


    // Configurer Swagger
    const config = new DocumentBuilder()
    .setTitle('API FootBall League ')  // Le titre de l'API
    .setDescription('Une API qui gère un championnat de Football et expose les différents endpoints suivants')  // Une brève description
    .setVersion('1.0')  // La version de l'API
    .addTag('users')  // Ajouter un tag pour organiser les endpoints
    .addTag('auth')
    .addTag('league')
    .addTag('saisons')
    .addTag('arbitres')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // L'URL pour accéder à la documentation Swagger (par exemple, http://localhost:3000/api)





  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
