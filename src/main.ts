import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ensureDir } from 'fs-extra'
import  * as path from 'app-root-path'

const port = process.env.PORT || 3000;
const uploadFolder = `${path}/uploads`;
ensureDir(uploadFolder)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('WELBEX')
    .setDescription('The WELBEX test description')
    .setVersion('1.0')
    .addTag('welbex')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => console.log(`Server is started on port ${port}`));
}
bootstrap();
