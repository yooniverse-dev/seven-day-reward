import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('AUTH_PORT') || 3001;
  await app.listen(port);
  console.log(`Auth service listening on http://localhost:${port}`);
}
bootstrap();
