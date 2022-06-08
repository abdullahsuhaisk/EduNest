import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // (app as any).set('etag', false);
  // setupApp(app);
  // app.use(cookieSession({
  //   keys: ['asdasda']
  // }));
  // // app.use((req, res, next) => {
  // //   // cookieSession({ keys: ['asdasda'] });
  // //   res.removeHeader('x-powered-by');
  // //   res.removeHeader('date');
  // //   next();
  // // });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
