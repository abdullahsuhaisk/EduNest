const cookieSession = require('cookie-session');
import { ValidationPipe } from '@nestjs/common';

export const setupApp = (app: any) => {
    app.use(cookieSession
        ({
        keys: ['asdasda']
      }));
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
        }),
      );
}