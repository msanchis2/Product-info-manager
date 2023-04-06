import * as fs from 'fs';
import {ApplicationConfig, SvanApplication} from './application';

export * from './application';
export async function main(options: ApplicationConfig = {}) {
  const app = new SvanApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      protocol: ((process.env.ENTORNO == "PRO") || (process.env.ENTORNO == "DEV")) ? ((process.env.PROTOCOL || 'http')) : 'http',
      key: ((process.env.ENTORNO == "PRO") || (process.env.ENTORNO == "DEV")) ? ((process.env.KEY) ? fs.readFileSync(process.env.KEY) : '') : '',
      cert: ((process.env.ENTORNO == "PRO") || (process.env.ENTORNO == "DEV")) ? ((process.env.CERT) ? fs.readFileSync(process.env.CERT) : '') : '',
      port: (process.env.ENTORNO == "PRO") ? (process.env.PORT_PRO) : (process.env.ENTORNO == "DEV") ? process.env.PORT_DEV : (process.env.PORT_LOCAL),
      host: (process.env.ENTORNO == "PRO") ? (process.env.HOST_PRO) : (process.env.ENTORNO == "DEV") ? process.env.HOST_DEV : (process.env.HOST_LOCAL),
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      requestBodyParser: {
        json: {
          limit: '10MB'
        }
      },
    },
    fileStorageDirectory: process.env.STORAGE_DIRECTORY,
    email: {
      type: process.env.MAIL_TYPE || 'smtp',
      host: process.env.MAIL_HOST,
      secure: false,
      port: process.env.MAIL_PORT,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    }
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
